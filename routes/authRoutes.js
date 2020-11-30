const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('./../config')
const jwt = require('jsonwebtoken')
const User = require('./../models/User')

const router = Router()

// Регистрация
router.post('/register', async (req, res) => {
  try {
    // получение данных из формы
    const {name, email, password, repassword} = req.body


    if (password === repassword) {
      // шифрование пароля
      const hashedPassword = await bcrypt.hash(password, 12)
      // создание пользователя
      const user = new User({name, email, password: hashedPassword})
      await user.save()

      res.status(201).json({message: 'Пользователь создан'})
    } else {
      return res.status(500).json({message: 'Пароли не совпадают'})
    }

  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
  }
})

router.post('/login', async (req, res) => {
  const {email, password} = req.body

  const user = await User.findOne({email})

  if (!user) {
    return res.status(400).json({message: 'Такой пользователь не найден'})
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    return res.status(400).json({message: `Неверный пароль, попробуйте снова`})
  }

  const token = jwt.sign(
    {userId: user.id},
    config.jwtSecret,
    {expiresIn: "1h"}
  )

  res.json({token, userId: user.id})
})

module.exports = router