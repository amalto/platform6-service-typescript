# Platform6 Node.js Service Demo
> :beginner: A demo project to show how to develop a **Platform 6** service with Node.js and TypeScript.

## What does this project show?

This project shows how to:

- implement a simple [Node.js](https://nodejs.org/en/) application with the framework [Express](https://expressjs.com/),
- initialize a service with given parameters,
- implement the endpoint called by the portal to display the service's client,
- call another service among an endpoint to get some data

## Develop the service's client

For now, you have to use [React](https://reactjs.org/) to develop the client.

The current example has been developed in React and [TypeScript](https://www.typescriptlang.org/).
The main file is `ServiceConfiguration.tsx` and all the TypeScript files need to be in the directory `core`.

You don't need the file `ServiceConfiguration.json`. It will be removed in the next releases.

Please refer to the documentation of our UI components on https://developers.local:8483/#/documentation.

__Note__: if you don't want to use TypeScript, you will have to update the `src/client/webpack.client.config.js` to remove the `ts-loader`.

## Run the project

### Build the client

To develop the service's client:

1. Go in the client's directory
````console
cd src/client/
````

2. Install the dependencies
````console
npm i
````

3. Compile the TypeScript files to generate a file `ServiceConfiguration.bundle.js` in the directory `src/client/bundle/`
````console
npm run build
````

__Note__: we've added the watch mode to the webpack compilation so that it doesn't need to be manually recompiled after every change.

### Run the server

To start the service's server, go in the root directory.

1. Install the dependencies
````console
npm i
````

2. Run the server
````console
npm run dev
````

It will start a server on port 8000 and it will deploy the service __demo.typescript__ on Platform 6.

An entry menu _TypeScript_ will appear in the menu.

![Demo TypeScript entry menu](images/demo_typescript_entry_menu.png)

When you click on it, it will call the endpoint `GET /apis/v.1.0.0/demo.typescript/portal`.
This endpoint returns the client's JavaScript bundle `ServiceConfiguration.bundle.js` and the data needed for service's initialisation.

Here is an example:

````json 
{
    script: '<p>Hello World!</p>',
    data: { 
        scripts: [ 
            { name: 'Script 1', appKey: 'ondiflo' }, 
            { name: 'Script 2', appKey: '' } 
        ] 
    }
}
````

- __script__: the client's JavaScript script (see [Build the client](#build-the-client) for building this file)
- __data__: an object containing different items 

The portal will use this response to display the service's UI.

![Demo TypeScript UI](images/demo_typescript_ui.png)
