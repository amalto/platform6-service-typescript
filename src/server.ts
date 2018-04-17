import Service from '@amalto/platform6-client'

import * as express from 'express'
import * as fs from 'fs'

const app = express()

const packageJson = require('../package.json')
const myServiceId = packageJson.name
const version = packageJson.version

const baseUrl = `/api/v${version}`
const path = `/${myServiceId}${baseUrl}`

let service: Service

const { PermissionsManager } = Service

app.get(`${path}/portal`, async function (request, response) {
	response
		.status(200)
		.send({ script: fs.readFileSync('client/build/ServiceConfiguration.bundle.js', 'utf8') })
})

app.get(`${path}/permissions`, async function (request, response) {
	const permissions = await PermissionsManager.getUserPermissions(request)

	// Check that the user has the permission 'demo.typescript=read' to receive the permissions
	if (!PermissionsManager.hasPermissions('Roxane', permissions, [{ feature: myServiceId, action: 'read' }])) {
		response.status(403).send({ message: `Unauthorized: you need to have the permission "${myServiceId}=read"` })
	}

	response.status(200).send(permissions)
})

app.listen(8000, () => {
	console.log('Server listening on port 8000!')

	service = new Service({
		username: 'admin@amalto.com',
		id: myServiceId,
		path,
		basePath: 'http://docker.for.mac.localhost:8000',
		versions: version,
		ui: {
			visible: true,
			iconName: 'fas fa-code',
			weight: 30,
			label: {
				'en-US': 'TypeScript',
				'fr-FR': 'TypeScript'
			}
		}
	})

	service.deployed.catch(console.error)
})

