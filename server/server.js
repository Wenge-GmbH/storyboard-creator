const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const gm = require('gm');
const _ = require('lodash');
const sharp = require('sharp');
const path = require('path');

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 3001;
const staticDirectory = path.join(__dirname, '../storyboard-creator-frontend/build');

app.use(express.json({type: '*/*'}));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('combined'));

app.use(express.static(staticDirectory))


let editorState;
app.get('/editor-state', (req, res) => {
  res.send(editorState);
})

io.on('connection', (socket) => {
  socket.on('sync-editor', ({operations, state}) => {
    console.log(operations);
    editorState = state;
    socket.broadcast.emit('sync-editor', operations);
  })
})

server.listen(port, () => {
  console.log(`server is startet on port: ${port}`);
})
