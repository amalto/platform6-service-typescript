import { CommonMessage, Header, Attachment } from './commonMessage'
import { v4 as uuid } from 'uuid'

function getHeaderKey(serviceId: string, key: string) {
	return `b2.${serviceId}.${key}`
}

function displayCommonMessage(message: string, commonMessage: CommonMessage) {
	// console.log(commonMessage);
	console.log(`${message}:\n${JSON.stringify(commonMessage)}`)
}

export class BusConnection {
	static getHeaderKey = getHeaderKey
	static displayCommonMessage = displayCommonMessage

	static createCommonMessage(replyTo: string, headers: Header[], attachments: Attachment[]) {
		const payload = { id: uuid(), replyTo, headers, attachments }
		const errorMessage = CommonMessage.verify(payload)

		if (errorMessage) throw new Error(`Unable to create a CommonMessage: ${errorMessage}`)

		return new CommonMessage(payload)
	}

	static createHeader(serviceId: string, key: string, value: string) {
		const payload =  { key: getHeaderKey(serviceId, key), value }
		const errorMessage = Header.verify(payload)

		if (errorMessage) throw new Error(`Unable to create an Header: ${errorMessage}`)

		return new Header(payload)
	}

	static createAttachment(headers: Header[], data: string) {
		const payload =  { headers, data }
		const errorMessage = Attachment.verify(payload)

		if (errorMessage) throw new Error(`Unable to create an Attachment : ${errorMessage}`)

		return new Attachment(payload)
	}
}
