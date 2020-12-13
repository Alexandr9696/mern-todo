const {notesValidator} = require('../utils/validators')
const {validationResult} = require('express-validator')
const {Router} = require('express')
const Note = require('./../models/Note')
const auth = require('./../middleware/authMiddleware')

const router = Router()


router.get('/list', auth, async (req, res) => {
  try {
    const notes = await Note.find({owner: req.user.userId})
    res.status(200).json(notes)
  } catch (e) {
    res.status(500).json({message: 'Заметки не загрузились, попробуйте снова'})
  }
})

router.post('/add', notesValidator, auth, async (req, res) => {

  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    return res.status(500).json({message: errors.array()[0].msg})
  }

  try {
    const isMatch = await Note.findOne({title: req.body.title, owner: req.user.userId})
    if (isMatch) {
      return res.status(500).json({message: 'Такая заметка уже существует'})
    }

    const note = new Note({
      title: req.body.title, owner: req.user.userId
    })
    await note.save()

    const notes = await Note.find({owner: req.user.userId})

    await res.status(200).json({notes, message: 'Заметка успешно создана!'})

  } catch (e) {
    res.status(500).json({message: 'Заметка не создана'})
  }

})

router.post('/remove', auth, async (req, res) => {
  try {
    await Note.deleteOne({
      _id: req.body.id
    })

    const notes = await Note.find({owner: req.user.userId})

    await res.status(200).json({notes, message: 'Заметка удалена!'})

  } catch (e) {
    res.status(500).json({message: 'Заметка не удалена'})
  }
})


module.exports = router