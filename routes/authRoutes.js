const {Router} = require('express')
const bcrypt = require('bcryptjs')
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

module.exports = router