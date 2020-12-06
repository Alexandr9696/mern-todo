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

router.post('/add', auth, async (req, res) => {

  try {
    const note = new Note({
      title: req.body.title, owner: req.user.userId
    })
    await note.save()

    const notes = await Note.find({owner: req.user.userId})

    await res.status(200).json(notes)


  } catch (e) {
    res.status(500).json({message: 'Заметка не создана', type: 'error'})
  }

})

router.post('/remove', auth, async (req, res) => {
  try {
    await Note.deleteOne({
      _id: req.body.id
    })

    const notes = await Note.find({owner: req.user.userId})

    await res.status(200).json(notes)

  } catch (e) {
    res.status(500).json({message: 'Заметка не удалена'})
  }
})


module.exports = router