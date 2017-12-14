import { Message, Type, Field } from 'protobufjs'

export class Header extends Message<Header> {
	@Field.d(1, 'string')
	public key: string

	@Field.d(2, 'string')
	public value: string
}

export class Attachment extends Message<Attachment> {
	@Field.d(1, Header, 'repeated')
	public headers: Header[]

	@Field.d(2, 'bytes')
	public data: string
}

// com.amalto.imdg.cm.

@Type.d('CommonMessage')
export class CommonMessage extends Message<CommonMessage> {
	hzGetCustomId() { return 10 }

	@Field.d(1, 'string')
	public id: string

	@Field.d(2, 'string')
	public replyTo: string

	@Field.d(3, Header, 'repeated')
	public headers: Header[]

	@Field.d(4, Attachment, 'repeated')
	public attachments: Attachment[]
}
