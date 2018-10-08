const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const gm = require('gm');
const _ = require('lodash');
const sharp = require('sharp');

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(bodyParser.json());
// gotta check if neede >_>
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('combined'));

const staticDirectory = `${__dirname}/../storyboard-creator-frontend/build`;
app.use(express.static(staticDirectory))

var editorState;

app.get('/editor-state', (req, res) => {
  res.send(editorState);
})


io.on('connection', (socket) => {
  // socket.emit('welcome', 'Hello WOrld');
  // socket.on('check-editor', (data) => {
  //   console.log('hi');
  //   console.log(editorState);
  //   if(editorState)
  //     socket.emit('editor-state', editorState);
  // })
  //
  // socket.on('editor-state', (editorData) => {
  //   editorState = editorData;
  //   socket.broadcast.emit('editor-state', editorData)
  // })
  socket.on('sync-editor', ({operations, state}) => {
    editorState = state;
    socket.broadcast.emit('sync-editor', operations);
  })
})


server.listen(3001, () => {
  console.log('server is startet on port 3001');
})
