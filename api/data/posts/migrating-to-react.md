It's been a while since I've written a blog entry.  In fact, it has been a long while since I've worked on anything besides work.

It is the end of the year, and with this comes more free time to work on side projects!

I've switched my employment from Microsoft to Pinterest and have found myself learning a lot of new technologies and this has inspired me to use my learnings of react, docker, and node to improve the blog.

## What is react?

React is the new hotness out of Facebook for client side rendering of web pages.  You can read up on its page [here](https://reactjs.org/).

Basically, it allows writing component based declaritive UIs which separate business logic from the rendering.  It uses jsx templates to put html into the javascript components which gives them a very html-like syntax.

Just do a simple [query on the web](https://www.bing.com/search?q=reactjs) for react and you will find a vibrant community of developers always improving the platform.

Here's a simple example of a react component and it being rendered on a page:

```javascript
import * as React from 'react';
import * as ReactDOM from 'react-dom';

function About() {
  return (
    <div>
      Hello world!
    </div>);
}

ReactDOM.render(
  <About />,
  document.getElementById('root') as HTMLElement
);
```

## Bootstrapping a react typescript project

I've updated the blog site to use react and typescript to do the rendering.  This allows strong typing of the components and has a very nice auto complete experience in [Visual Studio Code](https://code.visualstudio.com/).

The project was bootstrapped with the [Typescript react starter project](https://github.com/Microsoft/TypeScript-React-Starter).  The only requirements are that you have node.js installed on your system of choice.

I wanted to keep UI parity with the current django based site.  This meant keeping [Twitter Bootstrap](http://getbootstrap.com/) as the css and html.

Luckily, the Typescript react community is also very vibrant.  There are typings and components already for all the boostrap components so they can be easily used in react.  You can easily install the react-boostrap and types/react-bootstrap npm packages to have them available to use throughout your UI components.

## Changes to the server to support react

The previous site was all server side rendered.  With the new site being client side rendered, a new API had to be exposed to allow the client to retrieve blog entry lists and blog entry contents.

This API is very simple:
- /api/v1/blog returns a list of blog entries
- /api/v1/blog/<slug> returns a single blog entry json object.
- /api/v1/blog/latest returns the contents of the latest blog entry.

You can see the definition of the API [here](https://github.com/eliakaris/blog/blob/master/server/controllers/api.js).

The api routes can be seen [here](https://github.com/eliakaris/blog/blob/master/server/routes.js).

Now that the server doesnt have to deal with rendering logic, it is much simpler.  All the server does is server up the data through the api and all the css and js files which are stored in the public folder and the build folder.

## Building the client side bundle

The react typescript starter sets up a build using webpack.  In development mode, easily run `npm start` to run a development server.  In production, running `npm build` will build the production client bundle and store it in the build folder.

The server maps in the ./build folder to serve the static contents of the index.html file.

## Running it locally

To run everything locally, you have to start both the api server and the client side bits.

To start the api server, simply run `npm run server` from the command line.  This will start up the API server at localhost:3001.

To start the client build of react, run `npm start` from the command line.  This will startup a [webpack dev server](https://webpack.github.io/docs/webpack-dev-server.html) to serve the webpack output at localhost:3000.

The magic of having the web pack dev server hit the api at localhost:3001 is in the proxy setting in the package.json.  In our package.json, you see it set to "proxy": "http://localhost:3001".  You can read more of it [here](https://webpack.github.io/docs/webpack-dev-server.html#proxy).

Another sweet bonus of react and the dev server is that you can just save and refresh and the site will refresh automatically.

## That's all for today!

That's all for today folks.  Expect a couple more blog entries to be coming over the break!

