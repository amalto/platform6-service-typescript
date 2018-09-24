import * as express from 'express'
import * as debug from 'debug'

import { deployService } from '@amalto/platform6-client'
import { Constants } from './constants'
import { configure } from './application'

const app = express()
const log = debug('demo')

deployService({
	id: Constants.SERVICE_ID,
	path: Constants.PATH,
	basePath: 'http://docker.for.mac.localhost:8000',
	versions: Constants.VERSION,
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
	.then(onceDeployed)
	.catch(console.error)

function onceDeployed(service: any) {
	log('The service "%s" has been deployed on instance "%s".', service.id, service.instanceId)

	const server = app
		.use((req, res, next) => {
			res.setHeader('Connection', 'close')
			return next()
		})
		.listen(8000, () => {
			log('Server listening on port 8000.')

			app.locals.service = service

			configure(app)
		})
		.once('close', () => {
			log('Closing the server...')
			app.locals.service.undeployService().then(() => {
				log('Server closed and service undeployed.')
				process.exit()
			})
		})

	process.on('SIGINT', () => server.close())
}
