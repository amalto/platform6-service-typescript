import { BusConnection, PermissionsManager, Constants as ServiceConstants } from '@amalto/platform6-client'

import * as express from 'express'
import * as fs from 'fs'

import { Constants } from './constants'

const { PATH, SERVICE_ID } = Constants

export function configure (app: express.Express) {
	return app
		.get(`${PATH}/portal`, function (request: express.Request, response: express.Response) {
			fs
				.createReadStream('client/build/ServiceConfiguration.bundle.js')
				.pipe(response.status(200))
		})
		.get(`${PATH}/permissions`, async function (request: express.Request, response: express.Response) {
			const permissions = await PermissionsManager.getUserPermissions(request)

			// Check that the user has the permission 'demo.typescript=read' to receive the permissions
			if (!PermissionsManager.hasPermissions('Roxane', permissions, [{ feature: SERVICE_ID, action: 'read' }])) {
				response.status(403).send({ message: `Unauthorized: you need to have the permission "${SERVICE_ID}=read"` })
			}

			response.status(200).send(permissions)
		})
		.get(`${PATH}/list`, async function (request: express.Request, response: express.Response) {
			// List the existing scripts
			const scriptResponse = await app.locals.service.callService({
				username: request.query.username,
				receiverId: ServiceConstants.SERVICE_SCRIPTS_ID,
				action: 'list.ids'
			})

			const scripts = BusConnection.getHeaderValue(scriptResponse, ServiceConstants.PLATFORM6_RESPONSE_VALUE)

			response.status(200).send(scripts)
		})
}
