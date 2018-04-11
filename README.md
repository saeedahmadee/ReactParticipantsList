# React Participants List

React Participants List is a signup form and a list of participants application.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

A minimum of 20 participant items is generated on the server. Table of participants is sortable and there are options for removing a row.
React Participants List is built using SCSS, create-react-app, Semantic UI, [Webpack](https://webpack.js.org/), and Express JS.

[Semantic UI React](https://react.semantic-ui.com/) is used for user interface library and there is a small server application written with [ExpressJS](https://expressjs.com/) that serves the API for create, read and delete functions.

(TODO: add edit function)

## Local setup

> You can use npm to create the dev environment. Check out setup instructions [here](https://www.npmjs.com/get-npm) if you don't have it installed already. After that, you can run npm install to install all the needed dependencies. Use `npm run server` to run the server app and use `npm run start` to run the client app.

```
$ npm install
$ npm run server
$ npm run start
```

## Built using:
* [`create-react-app`](https://github.com/facebookincubator/create-react-app)
* [`webpack`](https://github.com/webpack/webpack)
* [`semantic-ui-react`](https://github.com/Semantic-Org/Semantic-UI-React)
* [`express`](https://github.com/expressjs/express/)
* [`chance`](http://chancejs.com/) for generating random participants data
* [`cors`](https://github.com/expressjs/cors) for resolving CORS related issues
* [`body-parser`](https://github.com/expressjs/body-parser) for parsing request bodies before sending requests with POST method
* [`validator`](https://www.npmjs.com/package/validator) for validating forms
