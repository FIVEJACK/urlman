# URL Manager

Url Manager is used to fetch and relay content. It can use http server or cloud function

## Basic dependencies
Make sure you have these installed in your computer for development
1. Node.js
2. Yarn (or npm)

## How to Configure
1. run `yarn install` to install dependencies
2. copy .env.example to .env and set your local environment there
3. run `yarn start`, and depending on your .env it will serve on http or cloudfunction, default will be served on localhost:7000

## Usage
Access the server `{HOSt}:{PORT}/url?u={SOURCE_URL}`

Host and port is the server, default is localhost:7000
Url is the source of content

For serving the app, update the .env with `SERVER=http` or `SERVER=lambda`

## Deployment

Running `yarn build && yarn bundle` will generate build.zip file containing .js file with all the necessary node_modules  

## License

MIT
