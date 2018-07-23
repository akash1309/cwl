import path from 'path';
import express from 'express';
import cors from 'cors';
import router from './router';
const app = express();

const http               = require('http');
const server = http.createServer(app);

//const port = process.env.PORT || 8080;
const port = 8080;

// Commenting consoles in production
  console.log = function(){};

const assets = express.static(path.join(__dirname, '../'));

app.use(cors());
app.use(assets);

app.get('*', router);

//app.listen(port);
//console.log(`Listening at http://localhost:${port}`);

 server.listen(port, (err) => {
	if ( ! err) {
 		console.log(`server is listening on `+ port);
 	}
 });
