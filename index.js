/*
<!--the content of the .end method be loaded whenever a client enters the wrong url-->
*/

const express = require('express'),
      http = require('http'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),

      dishRouter = require('./routes/promoRouter'),
      leaderRouter = require('./routes/leaderRouter'),
      promoRouter = require('./routes/promoRouter');//using the relative path since this is a file based node module
      

const hostname = "localhost";
const port = 3000;

const app = express();
 
//using the dishRouter in our express application
app.use('/dishes', dishRouter);
app.use('/leader', leaderRouter);
app.use('/promotions', promoRouter);

//app.use('/dishes/:dishId', dishRouter);
//app use morgan with development to print out additional information to the screen as required
app.use(morgan('dev')); 
//extract the data from the body of message sent by client using the body prser middleware
app.use(bodyParser.json);
 
/*THIS COMMENTED PART HAS BEEN ADDED TO THE dishRouter FILE IN THE route FOLDER*/ 
// app.all('/dishes', (req, res, next) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   next();
// });

// app.get('/dishes', (req, res, next) => {
//   res.end('Will send all the dishes to you!');
// })
// app.post('/dishes', (req, res, next) => { //the post will contain a json string with name and description property in the body of the request string
//   res.end('Will add all the dish: ' + req.body.name + ' with details: ' + req.body.description);
// })
// app.put('/dishes', (req, res, next) => {
//     res.statusCode = 403;
//     res.end('PUT operation is not supported on /dishes');
// })
// app.delete('/dishes', (req, res, next) => {
//   res.end('Deleting all the dishes');
// });

/*THE dishId IS ALO IMPLEMENTED IN THE dishRouter.js*/ 
// app.get('dishes/:dishId', (req, res, next) => {//localhost:3000/dishes/23 where 23 is the parameter of the dishId
//   res.end('Will send details  of the dish: ' + req.params.dishId + ' to you!');
// })
// app.post('dishes/:dishId', (req, res, next) => { //post operation is not supported because we are not creating a new dish
//   res.statusCode = 403;
//   res.end('POST operation is not supported on /dishes/' + req.params.dishId);
// })
// app.put('dishes/:dishId', (req, res, next) => {
//   res.write('Updating the dish: ' + req.params.dishId + '\n'); //a line to the reply messge
//   res.end('Will update the dish: ' + req.body.name + 
//       'with details: ' + req.body.description);
// })
// app.delete('dishes/:dishId', (req, res, next) => {
//   res.end('Deleting dish: ' + req.params.dishId);
// });

//look up the public folder from the root folder(__dirname)
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", 'text/html');
  res.end('<http><body>This is an express server</http></body>')
})

//create a server to run our express and morgan module
const server = http.createServer(app);

//listening to the server
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
})