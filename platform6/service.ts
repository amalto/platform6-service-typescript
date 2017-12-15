import { Address, Client as HazelcastClient, Config } from 'hazelcast-client'
import { BusConnection } from './busConnection'
import { ByteArraySerializer } from './byteArraySerializer'
import { Constants } from './constants'
import { CommonMessage } from './commonMessage'
import { v4 as uuid } from 'uuid'

declare namespace Service {
	export interface UIJsonBuilder {
		visible: boolean
		iconName: string
		weight: number
		label: { [key: string]: string }
	}

	export interface DeployParameters {
		username: string
		id: string
		path: string
		ctx: string
		version: string
		uiVersion: string
		ui: UIJsonBuilder
	}

	export interface CallParameters {
		username: string
		receiverId: string
		action: string
	}
}

export default class Service {
	public client: HazelcastClient
	public deployed: Promise<void>
	public idKey: string

	constructor(parameters: Service.DeployParameters) {
		this.idKey = `tmp.${parameters.id}`
		this.deployed = this.deployService(parameters)
	}

	private async deployService(parameters: Service.DeployParameters) {
		const { SERVICE_MANAGER_ID } = Constants

		const commonMessage = await BusConnection.createCommonMessage(this.idKey, [
			BusConnection.createHeader(null, Constants.USER_KEY, parameters.username),
			BusConnection.createHeader(SERVICE_MANAGER_ID, 'action', 'deploy'),
			BusConnection.createHeader(SERVICE_MANAGER_ID, 'service.id', parameters.id),
			BusConnection.createHeader(SERVICE_MANAGER_ID, 'node.id', uuid()),
			BusConnection.createHeader(SERVICE_MANAGER_ID, 'service.path', parameters.path),
			BusConnection.createHeader(SERVICE_MANAGER_ID, 'service.ctx', parameters.ctx),
			BusConnection.createHeader(SERVICE_MANAGER_ID, 'service.version', parameters.version),
			BusConnection.createHeader(SERVICE_MANAGER_ID, 'service.ui.version', parameters.uiVersion),
			BusConnection.createHeader(SERVICE_MANAGER_ID, 'service.ui', JSON.stringify(parameters.ui)),
		], [])

		if (!commonMessage) {
			throw new Error(`Unable to create the common message ${commonMessage.id}`)
		}

		if (!this.client) {
			const config = new Config.ClientConfig()

			config.serializationConfig.customSerializers.push(new ByteArraySerializer)
			config.networkConfig.addresses = [new Address('localhost', 5900)]

			this.client = await HazelcastClient.newHazelcastClient(config)
		}

		const response = await this.sendCommonMessage(Constants.SERVICE_MANAGER_ID, commonMessage)

		BusConnection.displayCommonMessage('Response', response)
	}

	public async callService(parameters: Service.CallParameters): Promise<CommonMessage> {
		const { receiverId } = parameters

		const commonMessage = await BusConnection.createCommonMessage(this.idKey, [
			BusConnection.createHeader(null, Constants.USER_KEY, parameters.username),
			BusConnection.createHeader(receiverId, 'action', parameters.action)
		], [])

		if (!commonMessage) {
			throw new Error(`Unable to create the common message ${commonMessage.id}`)
		}

		const response = await this.sendCommonMessage(receiverId, commonMessage)

		BusConnection.displayCommonMessage('Response', response)

		return response
	}

	public async sendCommonMessage(receiverId: string, commonMessage: CommonMessage): Promise<CommonMessage> {
		const hazelcastClient = this.client
		const receiverIdKey = 'cmb.' + receiverId
		const request = hazelcastClient.getQueue<CommonMessage>(receiverIdKey)
		const isSent = await request.offer(commonMessage)

		if (!isSent)
			throw new Error('Unable to send the message!')

		BusConnection.displayCommonMessage('Request to ' + receiverIdKey, commonMessage)

		const response = await hazelcastClient.getQueue<CommonMessage>(this.idKey).take()

		if (response.id !== commonMessage.id)
			throw new Error('Common message response\'s id is not the same as the common message request!')

		return response
	}
}
