const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://172.10.7.55:80',	// 서버 URL or localhost:설정한포트번호
      changeOrigin: true,
    })
  );
};