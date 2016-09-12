const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('./middleware/cors');
const request = require('superagent-bluebird-promise');

app.use(cookieParser());
app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors);

app.post('/wechat/webapp.htm', (req, res) => {
  console.log(req.body);
  request.post('http://106.75.13.249:8078/wechat/webapp.htm')
  .withCredentials()
  .send(req.body)
  .then((data) => {
    res.send(data);
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

app.listen(7011, (err) => {
  if (err) {
    console.log(err);
    return null;
  }

  return console.log('7011 port starting');
});
