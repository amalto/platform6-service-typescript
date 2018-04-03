import * as React from 'react'
import * as Platform6 from '@amalto/platform6-ui'

const { reactRedux, scopesHelpers, ActionButton, DataGrid, DataLine } = Platform6

const myServiceId = 'demo.typescript'

declare namespace ServiceConfiguration {
	interface Id {
		appKey: string
		name: string
	}

	interface Column {
		id: string
		label: string
		textAlign?: string
		width?: number
	}

	interface Cell {
		columnId: string
		cssClass: string
		textAlign?: string
		displayValue: JSX.Element | string
		readOnly?: boolean
		isEdited?: boolean
	}


	interface Props extends ServiceConfiguration, Platform6.DynamicComponent.CustomProps {}

	interface State {
		scripts: Id[]
		permissions: any
	}
}

class ServiceConfiguration extends React.Component<ServiceConfiguration.Props, ServiceConfiguration.State> {
	state = {
		scripts: [],
		permissions: null
	}

	componentWillMount() {
		const { props } = this
		const { api } = props

		api
			.get(api.endpoints.getUrlOfFeature('platform6.scripts', '/scripts'))
			.then(scripts => this.setState({ scripts }))
			.catch(props.handleErrorDisplay)
	}

	render () {
		const { permissions } = this.state

		return <div>
			<h4 className="mgb-15 mgt-15">Hello ! I am a service developed in TypeScript.</h4>

			<div>
				<p className="mgr-5">Click on the following button to display your permissions:</p>
				<ActionButton
					clickAction={() => this.getPermissions()}
					iconClass='fa fa-key'
					tooltipText='Read the permissions' />
				{ permissions && <p>My permissions are: <pre>{JSON.stringify(permissions, null, 2)}</pre></p> }
			</div>
				{ scopesHelpers.hasPermission(`${myServiceId}=edit`) && <p>This message is only displayed when you have the permission "edit".</p> }
			<div>

			</div>

			<p className="mgb-15 mgt-15">For now, I can retrieve the list of items in the <code>Platform6.Scripts</code> service.</p>

			<DataGrid
				dataGridId='demo.typescript_datagrid'
				columnHeaders={this.getColumns()}
				dataLines={this.renderDataLines()}
				noItemsMsg='No scripts founded' />
		</div>
	}

	private getColumns = (): ServiceConfiguration.Column[] => {
		return [
			{
				id: 'appKey',
				label: 'Application key',
				width: 300
			},
			{
				id: 'name',
				label: 'Name',
				width: 700
			}
		]
	}

	private renderDataLines = (): JSX.Element[] => {
		const { scripts } = this.state

		if (!scripts) return []

		return scripts.map((script, index) => {
			return <DataLine
				key={index}
				cells={this.getCells(script)} />
		})
	}

	private getCells = (script: ServiceConfiguration.Id): ServiceConfiguration.Cell[] => {
		return [
			{
				columnId: 'appKey',
				cssClass: 'dg-item-data-value',
				displayValue: script.appKey,
				readOnly: true
			},
			{
				columnId: 'name',
				cssClass: 'dg-item-data-value multiline',
				displayValue: script.name,
				readOnly: true
			}
		]
	}

	private getPermissions = (): void => {
		const { api } = this.props

		api
			.get(api.endpoints.getUrlOfFeature(myServiceId, '/permissions', 'http://docker.for.mac.localhost:8000'))
			.then(response => this.setState({ permissions: response }))
			.catch(this.props.handleErrorDisplay)
	}
}

export default reactRedux.connect()(ServiceConfiguration)
