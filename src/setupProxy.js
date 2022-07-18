const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://blog.zhangzhengyang.com/',
      changeOrigin: true,
    })
  );
};
