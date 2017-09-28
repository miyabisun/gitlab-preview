const fs = require('fs')
const express = require('express')
const stylus = require('stylus')
const R = require('ramda')
const markdown = require('../lib/markdown.js')

module.exports = () => {
  const app = express()
  app.listen(80)
  app.set('view engine', 'pug')
  app.use(markdown({
    directory: `/work`,
    view: `${__dirname}/view`
  }))
  app.get('/', (req, res) => res.redirect('/home.md'))
  app.get('/style.css', (req, res) => {
    res.set('Content-Type', 'text/css')
    const filePath = `${__dirname}/style.styl`
    R.pipe(
      fs.readFileSync,
      R.toString,
      it => stylus(it),
      it => it.import(`${__dirname}/variables.styl`),
      it => it.render((err, css) => {
        if (err) {
          console.error(`${err.name}: #file-path`)
          console.error(err.message)
        }
        res.send(css)
      })
    )(filePath)
  })
  app.get('/script.js', (req, res) => {
    res.set('Content-Type', 'text/javascript')
    const filePath = `${__dirname}/script.js`
    R.pipe(
      fs.readFileSync,
      R.toString,
      it => res.send(it)
    )(filePath)
  })
  return app
}
