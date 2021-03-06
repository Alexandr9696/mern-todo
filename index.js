const express = require('express')
const path = require('path')
const { createServer } = require('http')
const mongoose = require('mongoose')
const config = require('./config')
const authRoutes = require('./routes/authRoutes')
const noteRoutes = require('./routes/noteRoutes')

const app = express()
// для распознавания входящего объекта запроса как объекта JSON
app.use(express.json({extended: true}))

app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/auth', authRoutes)
app.use('/note', noteRoutes)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('MongoDb connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000

const server = createServer(app);
server.listen(PORT, () => console.log(`server is up. port: ${PORT}`));