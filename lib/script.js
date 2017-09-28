(function() {
  var uri = "ws://localhost:4002/"
  var ws = new WebSocket(uri)
  ws.onmessage = function(event) {
    var data = event.data
    console.log("Markdown file update.")
    console.log(data, decodeURI(location.pathname))
    if (data === decodeURI(location.pathname)) location.reload()
  }
})()
