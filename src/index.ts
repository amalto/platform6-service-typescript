import Service from '../platform6/service'

import * as express from 'express'

const app = express()

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(8000, () => {
	console.log('Example app listening on port 8000!');

	const myServiceId = 'demo.typescript'

	new Service({
		username: 'admin@amalto.com',
		id: myServiceId,
		path: `/apis/v2/${myServiceId}`,
		ctx: 'http://localhost:8000',
		version: '5.14.0-SNAPSHOT',
		uiVersion: '0.0.1',
		ui: {
			visible: true,
			iconName: 'fa-codepen',
			weight: 30,
			label: {
				'en-US': 'TypeScript',
				'fr-FR': 'TypeScript'
			}
		}
	}).deployed.catch(console.error)
})

