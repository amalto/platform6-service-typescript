import Service from '../../platform6/service'
import { BusConnection } from '../../platform6/busConnection'
import { Constants } from '../../platform6/constants'

import * as express from 'express'
import * as fs from 'fs'

const app = express()
const myServiceId = 'demo.typescript'

let service: Service

app.get('/apis/v.1.0.0/demo.typescript/portal', async function (request, response) {
	const scriptsResponse = await service.callService({
		username: 'admin@amalto.com',
		receiverId: Constants.SERVICE_SCRIPTS_ID,
		action: 'list'
	})

	const servicePortal = {
		script: fs.readFileSync('src/client/bundle/ServiceConfiguration.bundle.js', 'utf8'),
		data: {
			scripts: BusConnection.getHeaderValue(scriptsResponse, Constants.SERVICE_SCRIPTS_ID, 'scriptIds')
		}
	}

	response.json(servicePortal)
	response.status(200)

	response.send(response);
})

app.listen(8000, () => {
	console.log('Example app listening on port 8000!');

	service = new Service({
		username: 'admin@amalto.com',
		id: myServiceId,
		path: `/apis/v.1.0.0/${myServiceId}`,
		ctx: 'http://localhost:8000',
		version: '1.0.0',
		uiVersion: '0.0.1',
		ui: {
			visible: true,
			iconName: 'fa-code',
			weight: 30,
			label: {
				'en-US': 'TypeScript',
				'fr-FR': 'TypeScript'
			}
		}
	})

	service.deployed.catch(console.error)
})

