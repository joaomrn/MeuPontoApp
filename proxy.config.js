const proxy = [
    {
      context: '/api',
      target: 'http://localhost:61635/api/MeuPonto',
      pathRewrite: {'^/api' : ''}
    }
  ];
  
  module.exports = proxy;