import { ByteArraySerializer as Serializer } from 'hazelcast-client/lib/serialization/DefaultSerializer'
import { DataInput, DataOutput } from 'hazelcast-client/lib/serialization/Data';
import { CommonMessage } from './commonMessage';

export class ByteArraySerializer extends Serializer {
	getId(): number {
		return 10
	}

	read(input: DataInput) {
		const value = input.readByteArray()
		console.log(value)
		return CommonMessage.decode(new Uint8Array(value))
	}

	write(output: DataOutput, object: CommonMessage) {
		output.writeByteArray([...CommonMessage.encode(object).finish()])
	}
}
