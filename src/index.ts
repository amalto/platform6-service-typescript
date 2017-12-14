import Service from '../platform6/service'

import * as express from 'express'

const app = express()

app.get('/apis/v.1.0.0/demo.typescript/portal', function (request, response) {
	response.send('Hello World');
})

app.listen(8000, () => {
	console.log('Example app listening on port 8000!');

	const myServiceId = 'demo.typescript'

	new Service({
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
	}).deployed.catch(console.error)
})

