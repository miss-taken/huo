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

app.post('/login', (req, res) => {
  request.post('http://majorszhang.imwork.net/wechat/webapp.htm')
  .send(req.body)
  .then((data) => {
    console.log('res', data);
    res.send('ok');
  })
  .catch(err => console.log('err', err));
});

app.listen(7011, (err) => {
  if (err) {
    console.log(err);
    return null;
  }

  return console.log('7011 port starting');
});
