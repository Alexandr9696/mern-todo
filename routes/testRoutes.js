const {Router} = require('express')

const router = Router()

router.get('/about', (req, res) => {
  res.json('Hello from node.js')
})

module.exports = router