const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
// const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('./middleware/cors');
const request = require('superagent-bluebird-promise');

// const request = require('superagent-bluebird-promise');

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
console.log('bug');
app.use(cors);


app.post('/wechat/webapp.htm', (req, res) => {
  Console.log(req.body);
  request.post('http://106.75.13.249:8078/wechat/webapp.htm')
  .withCredentials()
  .send(req.body)
  .then((res) => {
      res.send(res);
  });


  res.send('ok');
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: (app.get('env') === 'development') ? err : {},
  });
});

app.listen(8090, (err) => {
  if (err) {
    console.log('Error: ', err);
  }
  console.log('port 8089 in opened');
});

// module.exports = app;
