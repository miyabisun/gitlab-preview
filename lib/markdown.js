const fs = require('fs')
const path = require('path')
const url = require('url')
const markdown = require('marked')
const readdir = require('fs-readdir-recursive')
const plantuml = require('plantuml-encoder')
const R = require('ramda')
const decode = require('urldecode')

const renderer = new markdown.Renderer
const defaultRenderer = new markdown.Renderer
renderer.code = (code, lang, escaped) => {
  if (lang === 'plantuml') {
    return `<p><img src="http://localhost:4001/svg/${plantuml.encode(code)}" /></p>`
  } else {
    return defaultRenderer.code(code, lang, escaped)
  }
}

module.exports = (options = {}) => {
  const {view, variable = 'markdown'} = options
  if (!options) throw new Error('Missing options argument')
  if (!options.directory) throw new Error('Missing "directory" value in options')
  const dir = path.resolve(options.directory)

  return (req, res, next) => {
    const fileLower = req.url.toString().toLowerCase()
    if (fileLower.slice(-3) !== '.md' && fileLower.slice(-9) !== '.markdown') return next()

    const file = R.pipe(
      it => it.url.toString(),
      decode,
      it => `${dir}/${it}`,
      path.resolve
    )(req)

    fs.readFile(file, 'utf8', (err, data) => {
      if (err) return next(err)
      const variable = markdown(data, {renderer})
      if (view)
        res.render(view, {variable, pages: readdir(dir, it => !/node_modules/.test(it)).filter(it => /\.md$/.test(it))})
      else
        res.send(variable)
    })
  }
}
