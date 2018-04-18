import Service from '@amalto/platform6-client'

import * as express from 'express'
import * as fs from 'fs'

import { Constants } from './constants'

const { PATH, SERVICE_ID } = Constants
const { PermissionsManager } = Service

export function configure (app: express.Express) {
	return app
		.get(`${PATH}/portal`, async function (request: express.Request, response: express.Response) {
			response.status(200)
			fs
				.createReadStream('client/build/ServiceConfiguration.bundle.js', 'utf8')
				.pipe(response)
		})
		.get(`${PATH}/permissions`, async function (request: express.Request, response: express.Response) {
			const permissions = await PermissionsManager.getUserPermissions(request)

			// Check that the user has the permission 'demo.typescript=read' to receive the permissions
			if (!PermissionsManager.hasPermissions('Roxane', permissions, [{ feature: SERVICE_ID, action: 'read' }])) {
				response.status(403).send({ message: `Unauthorized: you need to have the permission "${SERVICE_ID}=read"` })
			}

			response.status(200).send(permissions)
		})
}
