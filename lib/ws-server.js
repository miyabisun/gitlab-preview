const WebSocket = require('ws')
const chokidar = require('chokidar')

// ws-server :: Undefined -> WebSocketServer
module.exports = () => {
  const wss = new WebSocket.Server({port: 8080})
  const watcher = chokidar.watch('/work', {
    persistent: true
  })
  watcher.on('change', (filePath) => {
    const path = filePath.replace(/^\/work/, "")
    console.log('changed:', path)
    if (!/\.md$/.test(path)) return
    wss.clients.forEach(client => client.send(path))
  })
  return wss
}
