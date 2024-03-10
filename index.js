const express = require('express');
const fs = require('fs');
const { createProxyMiddleware } = require('http-proxy-middleware');

const port = process.env.PORT || fs.readFileSync('./config/port.dat','utf8').trim();
const urlTarget = fs.readFileSync('./config/url.dat','utf8').trim();
const server = express();

server.use('/', createProxyMiddleware({ 
  target: urlTarget,
  changeOrigin: true,
  pathRewrite: {
    '^/': ''
  },
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(500).send('Maaf saat ini server sedang di perbaiki.');
  }
}));


server.listen(port, () => {
  console.log('Proxy server berjalan pada port',port);
});
