import * as React from 'react'
import * as Platform6 from '@amalto/platform6-ui'

const { reactRedux, DataGrid, DataLine } = Platform6

declare namespace ServiceConfiguration {
	interface Id {
		name: string
		appKey: string
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

	interface Props extends ServiceConfiguration, Platform6.DynamicComponent.CustomProps {
		data: { scripts: Id[] }
	}

	interface State {}
}

class ServiceConfiguration extends React.Component<ServiceConfiguration.Props, ServiceConfiguration.State> {
	render () {
		return <div>
			<h4 className="mgb-15 mgt-15">Hello ! I am a service developed in TypeScript.</h4>

			<p className="mgb-15 mgt-15">For now, I can retrieve the list of items in the <code>Platform6.Scripts</code> service.</p>

			<DataGrid
				dataGridId='demo.typescript_datagrid'
				columnHeaders={this.getColumns()}
				dataLines={this.renderDataLines(this.props.data.scripts)}
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

	private renderDataLines = (scripts: ServiceConfiguration.Id[]): JSX.Element[] => {
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
}

export default reactRedux.connect()(ServiceConfiguration)
