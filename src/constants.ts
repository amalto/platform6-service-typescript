const packageJson = require('../package.json')

const SERVICE_ID = packageJson.name
const VERSION = packageJson.version
const BASEURL = `/api/v${VERSION}`

export const Constants = {
	BASEURL,
	PATH: `/${SERVICE_ID}${BASEURL}`,
	SERVICE_ID,
	USERNAME: 'admin@amalto.com',
	VERSION
}
