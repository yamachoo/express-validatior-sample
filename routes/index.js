const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')

const checkValidation = () => {
  return (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
}

router.post('/user', [
  body('username').isEmail(),
  body('password').isLength({ min: 5 }),
  checkValidation()
],
(req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password
  }).then(user => res.json(user))
})

module.exports = router
