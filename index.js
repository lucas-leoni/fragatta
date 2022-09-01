const express = require('express');
const app = express();

// estamos adotando o servidor do Node ao invés do express
const http = require('http').createServer(app);
const io = require('socket.io') (http);

app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('index');
});

io.on('connection', (socket) => {
  console.log('socket instance: ', socket.id);
  socket.on('welcome', (data) => {
    console.log('evento do client chegou no servidor', data);
  });
  socket.on('palavra', (data) => {
    console.log('Palavra do input do client chegou no servidor: ', data);

    socket.emit('resultado', data)
    console.log('Enviando resultado para o client');
  });
});

// executando servidor na porta 5000
http.listen(5000, () => {
  console.log('servidor rodando: http://localhost:5000');
});