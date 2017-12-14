declare namespace Interfaces {
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
}

export default Interfaces
