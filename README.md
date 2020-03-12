This is a demonstration Todo list app project that uses was bootstrapped using [Create React App](https://github.com/facebook/create-react-app). It uses [Redux](https://redux.js.org/) for state management and the newly released [Redux Toolkit](https://redux-toolkit.js.org/).

The following functionality is implemented. Each todo has 2 fields - title and description.

On the server, the API is secured using the bearer token strategy that is implemented using [express-bearer-token](https://www.npmjs.com/package/express-bearer-token). Also, the notes are persisted using [node-persist](https://www.npmjs.com/package/node-persist)

## Available Scripts

In the project directory, you can run:

### `npm install'

to install all the dependancies for the front end and the server.

To run the app, use:

### `npm run dev`

which would spin up the server on port 8000 and the front end on port 3000.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
