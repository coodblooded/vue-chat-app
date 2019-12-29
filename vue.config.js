module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    host: '0.0.0.0',
    port: 80,
    hot: true,
    disableHostCheck: true,
    proxy:{
      '/api':{
        target:'http://localhost:8080',
        changeOrigin:true
      }

    }
  }
};
