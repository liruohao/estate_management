'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)


//'创建express服务器'
const express=require('express')
const app=express()
var apiRoutes=express.Router()

// //'获取json数据'
// var loginData=require('./../data/login/login.json')
// var employData=require('./../data/employ/employ.json')
// var peopleData=require('./../data/people/people.json')
// var customerData=require('./../data/customer/customer.json')
// var addData=require('D:/My Documents/HBuilderProjects/sjtcProperty/data/center/dataAdd.json')
// var workerData=require('D:/My Documents/HBuilderProjects/sjtcProperty/data/center/workerData.json')
// var visiterData=require('D:/My Documents/HBuilderProjects/sjtcProperty/data/center/visiterData.json')
// var equipment=require('D:/My Documents/HBuilderProjects/sjtcProperty/data/equipment/equipment.json')
// var check=require('D:/My Documents/HBuilderProjects/sjtcProperty/data/check/check.json')
// var something=require('D:/My Documents/HBuilderProjects/sjtcProperty/data/something/something.json')
// var power=require('D:/My Documents/HBuilderProjects/sjtcProperty/data/power/power.json')
// var subcontract=require('D:/My Documents/HBuilderProjects/sjtcProperty/data/subcontract/subcontract.json')
// var stopCar=require('D:/My Documents/HBuilderProjects/sjtcProperty/data/stopCar/stopCar.json')
// var payform=require('D:/My Documents/HBuilderProjects/sjtcProperty/data/payform/payform.json')
// var lease=require('D:/My Documents/HBuilderProjects/sjtcProperty/data/Lease/lease.json')
// var contract=require('D:/My Documents/HBuilderProjects/sjtcProperty/data/contract/contract.json')
//
//
// //'使用模拟数据'
// app.use('/api/login',apiRoutes)
// app.use('/api/employ',apiRoutes)
// app.use('/api/people',apiRoutes)
// app.use('/api/customer',apiRoutes)
// app.use('/api/dataAdd',apiRoutes)
// app.use('/api/workerData',apiRoutes)
// app.use('/api/visiter',apiRoutes)
// app.use('/api/equipment',apiRoutes)
// app.use('/api/check',apiRoutes)
// app.use('/api/something',apiRoutes)
// app.use('/api/power',apiRoutes)
// app.use('/api/contract',apiRoutes)
// app.use('/api/stopCar',apiRoutes)
// app.use('/api/payform',apiRoutes)
// app.use('/api/lease',apiRoutes)
// app.use('/api/subcontract',apiRoutes)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    //ajax请求
    before(app) {
      //获取用户列表
      app.get('/api/login',(req,res)=>{
        res.json({
          errno:0,
          data:loginData
        })
      })
      app.get('/api/employ',(req,res)=>{
        res.json({
          errno:0,
          data:employData
        })
      })
      app.get('/api/people',(req,res)=>{
        res.json({
          errno:0,
          data:peopleData
        })
      })
      app.get('/api/customer',(req,res)=>{
        res.json({
          errno:0,
          data:customerData
        })
      })
      app.get('/api/dataAdd',(req,res)=>{
        res.json({
          errno:0,
          data:addData
        })
      })
      app.get('/api/workerData',(req,res)=>{
        res.json({
          errno:0,
          data:workerData
        })
      })
      app.get('/api/visiter',(req,res)=>{
        res.json({
          errno:0,
          data:visiterData
        })
      })
      app.get('/api/equipment',(req,res)=>{
        res.json({
          errno:0,
          data:equipment
        })
      })
      app.get('/api/check',(req,res)=>{
        res.json({
          errno:0,
          data:check
        })
      })
      app.get('/api/something',(req,res)=>{
        res.json({
          errno:0,
          data:something
        })
      })
      app.get('/api/power',(req,res)=>{
        res.json({
          errno:0,
          data:power
        })
      })
      app.get('/api/contract',(req,res)=>{
        res.json({
          errno:0,
          data:contract
        })
      })
      app.get('/api/stopCar',(req,res)=>{
        res.json({
          errno:0,
          data:stopCar
        })
      })
      app.get('/api/payform',(req,res)=>{
        res.json({
          errno:0,
          data:payform
        })
      })
      app.get('/api/lease',(req,res)=>{
        res.json({
          errno:0,
          data:lease
        })
      })
      app.get('/api/subcontract',(req,res)=>{
        res.json({
          errno:0,
          data:subcontract
        })
      })
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
