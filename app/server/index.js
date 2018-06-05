import app from './app';
//const http               = require('http');
const port = process.env.PORT || 8080;
//const server = http.createServer(app);

app.listen(port);
console.log(`Listening at http://localhost:${port}`);


// server.listen(port, (err) => {
// 	if ( ! err) {
// 		console.log(`server is listening on `+ port);
// 	}
// });
