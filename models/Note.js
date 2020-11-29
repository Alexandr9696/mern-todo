const {Schema, model} = require('mongoose')

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
})


module.exports = model('Note', schema)