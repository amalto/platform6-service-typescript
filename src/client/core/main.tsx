
// require( 'source-map-support' ).install()
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { forms, DynamicComponent } from 'b2portal-ui'

import { Provider } from 'react-redux'
import { createStore, Store, combineReducers } from 'redux'

//RHL
import { AppContainer } from 'react-hot-loader'

import { addLocaleData, IntlProvider } from 'react-intl'

declare const require: any
declare const COMPONENT: any


const finalReducer = combineReducers( { form: forms.reducer } )
const store: Store<any> = createStore( finalReducer )

const compName = ( typeof COMPONENT == 'undefined' ? 'ServiceConfiguration' : COMPONENT )


const getComp = () => {
    const Comp = require( `./${ compName }` ).default

    let data = require( `./${ compName }.json` )

    if ( !data ) {
        data = {}
    }

    const dynComponentProps: DynamicComponent.CustomProps = {
        data: data,
        api: null,
        appHistory: null,
        refreshData: null,
        showDialog: null,
        hideDialog: null,
        displayNotification: null,
        handleErrorDisplay: null
    }

    return <div style={{ padding: 20 }}><Comp {...dynComponentProps} /></div>
}

const content = (
    <AppContainer>
        <IntlProvider locale={'en-US'}>
            <Provider store={store}>{getComp()}</Provider>
        </IntlProvider>
    </AppContainer>
)

ReactDOM.render(
    content,
    document.getElementById( 'reactApp' )
)

declare const module: any



if ( module.hot ) {
    module.hot.accept( '../generated/' + compName, () => {
        ReactDOM.render(
            content,
            document.getElementById( 'reactApp' )
        )
    } )
}