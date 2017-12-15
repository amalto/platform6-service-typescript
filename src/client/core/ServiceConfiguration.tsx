import * as React from 'react'
import * as b2portal from 'b2portal-ui'

import Interfaces from './Interfaces'

const { reactRedux, DataGrid, DataLine } = b2portal

declare namespace ServiceConfiguration {
	interface Props extends ServiceConfiguration, b2portal.DynamicComponent.CustomProps {
		data: { scripts: Interfaces.Id[] }
	}

	export interface State {}
}

class ServiceConfiguration extends React.Component<ServiceConfiguration.Props, ServiceConfiguration.State> {
	constructor (props: ServiceConfiguration.Props) {
		super(props)

		this.state = {}
	}

	render () {
		return <div>
			<h4 className="mgb-15 mgt-15">Hello ! I am a service developed in TypeScript.</h4>
			<p className="mgb-15 mgt-15">For now, I can retrieve the list of items in the Platform6.Scripts service.</p>
			<DataGrid
				columnHeaders={this.getColumns()}
				dataLines={this.renderDataLines(this.props.data.scripts)}
				noItemsMsg='No scripts founded' />
		</div>
	}

	private getColumns = (): Interfaces.Column[] => {
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

	private renderDataLines = (scripts: Interfaces.Id[]): JSX.Element[] => {
		if (!scripts) return []

		return scripts.map((script, index)=> {
			return <DataLine
				key={index}
				cells={this.getCells(script)} />
		})
	}

	private getCells = (script: Interfaces.Id): Interfaces.Cell[] => {
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
}

export default reactRedux.connect()(ServiceConfiguration)
