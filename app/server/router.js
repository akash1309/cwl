import React from 'react';
import { renderToString } from 'react-dom/server'
import { matchPath, StaticRouter } from 'react-router-dom';

import App from '../components/App';
import routes from './routes';
import renderFullPage from './renderFullPage';

export default function router(req, res) {

  const match = routes.reduce((acc, route) => matchPath(req.url, { path: route, exact: true }) || acc, null);

  if (!match) {
    res.status(404).send('page not found');
    return;
  }

  const html = renderToString(
    <StaticRouter context={{}} location={req.url} >
      <App/>
    </StaticRouter>
  )

  res.status(200).send(renderFullPage(html));

};
