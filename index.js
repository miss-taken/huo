const path = require('path');
const webpack = require('webpack');
const express = require('express');
// const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.dev');

const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static('public'));
app.use(express.static('dist'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(8088, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listenning at http://localhost:8088');
});
