import Service from '@amalto/platform6-client'

import * as express from 'express'
import * as fs from 'fs'

const app = express()
const myServiceId = 'demo.typescript'
const version = require('../package.json').version
const baseUrl = `/apis/v${version}/`

let service: Service

app.get(`${baseUrl}demo.typescript/portal`, async function (request, response) {
	const scriptsResponse = await service.callService({
		username: 'admin@amalto.com',
		receiverId: Service.Constants.SERVICE_SCRIPTS_ID,
		action: 'list'
	})

	const servicePortal = {
		script: fs.readFileSync('client/build/ServiceConfiguration.bundle.js', 'utf8'),
		data: {
			scripts: Service.BusConnection.getHeaderValue(scriptsResponse, Service.Constants.SERVICE_SCRIPTS_ID, 'scriptIds') || {}
		}
	}

	response.status(200).send(servicePortal)
})

app.listen(8000, () => {
	console.log('Example app listening on port 8000!')

	service = new Service({
		username: 'admin@amalto.com',
		id: myServiceId,
		path: baseUrl + myServiceId,
		basePath: 'http://docker.for.mac.localhost:8000',
		versions: version,
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

