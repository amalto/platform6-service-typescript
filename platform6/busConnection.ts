import { CommonMessage, Header, Attachment } from './commonMessage'
import { v4 as uuid } from 'uuid'

function getHeaderKey(serviceId: string, key: string): string {
	return `b2.${serviceId}.${key}`
}

function displayCommonMessage(message: string, commonMessage: CommonMessage): void {
	console.log(`${message}:\n${JSON.stringify(commonMessage)}`)
}

function getHeaderValue(commonMessage: CommonMessage, serviceId: string, key: string) {
	const headerKey = getHeaderKey(serviceId, key)

	const header = CommonMessage
		.fromObject(commonMessage.toJSON())
		.headers
		.find(header => header.key === headerKey)

	if (!header) {
		console.log(`Header with key ${headerKey} is not found!`)
		return {}
	}

	return JSON.parse(header.value)
}

export class BusConnection {
	static getHeaderKey = getHeaderKey
	static getHeaderValue = getHeaderValue
	static displayCommonMessage = displayCommonMessage

	static createCommonMessage(replyTo: string, headers: Header[], attachments: Attachment[]): CommonMessage {
		const payload = { id: uuid(), replyTo, headers, attachments }
		const errorMessage = CommonMessage.verify(payload)

		if (errorMessage) throw new Error(`Unable to create a CommonMessage: ${errorMessage}`)

		return new CommonMessage(payload)
	}

	static createHeader(serviceId: string, key: string, value: string): Header {
		const payload =  { key: serviceId ? getHeaderKey(serviceId, key) : key, value }
		const errorMessage = Header.verify(payload)

		if (errorMessage) throw new Error(`Unable to create an Header: ${errorMessage}`)

		return new Header(payload)
	}

	static createAttachment(headers: Header[], data: string): Attachment {
		const payload =  { headers, data }
		const errorMessage = Attachment.verify(payload)

		if (errorMessage) throw new Error(`Unable to create an Attachment : ${errorMessage}`)

		return new Attachment(payload)
	}
}
