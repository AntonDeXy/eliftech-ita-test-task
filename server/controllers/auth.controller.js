const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const UserModel = require('../models/user.model')
const refreshTokenModel = require('../models/refresh-token.model')
const config = require('../config.json')

exports.register = async (req, res) => {
  const username = req.body.username
  const password = req.body.password

  if (!username || username.length < 4) {
    return res.status(401).json({success: false, msg: 'Username length must be at least 4'})
  }

  if (!password || password.length < 8) {
    return res.status(401).json({success: false, msg: 'Password length must be at least 8'})
  }

  const isUsernameExist = await UserModel.findOne({username})

  if (isUsernameExist) return res.status(403).json({success: false, msg: 'User with this username already exists'})

  try {
    const hashedPass = await bcrypt.hash(req.body.password, 10)

    const user = new UserModel({
      username,
      password: hashedPass
    })

    const createdUser = await user.save()
    const userToSend = { ...createdUser._doc }
    delete userToSend.password
    res.status(201).json({success: true, user: { ...userToSend }})
  } catch(err) {
    throw err
    res.status(400).json({success: false, msg: err})
  }
}

exports.login = async (req, res) => {
  const password = req.body.password

  if (!password || password.length < 8) {
    return res.status(403).json({success: false, msg: 'Password length must be at least 8'})
  }

  const user = await UserModel.findOne({username: req.body.username})

  if (!user) {
    return res.status(403).send({success: false, msg: 'User with this username not found'})
  }

  const isPasswordRight = await bcrypt.compare(password, user.password)

  const date = new Date()

  if (isPasswordRight) {
    const accessToken = generateAccessToken({...user._doc, cv: null}, date)
    const refreshToken = await generateRefreshToken({...user._doc, cv: null}, date)
    
    const userToSend = { ...user._doc }
    delete userToSend.password

    return res.status(200).json({success: true, accessToken, refreshToken, user: { ...userToSend }})
  } else {
    return res.status(403).send({success: false, msg: 'Password is not valid'})
  }
}

exports.getNewTokenByRefreshToken = async (req, res) => {
  const refreshToken = req.body.refreshToken
  if (!refreshToken) return res.sendStatus(401)

  const isTokenExists = await refreshTokenModel.findOne({refreshToken})
  if (!isTokenExists) return res.sendStatus(403)

  jwt.verify(refreshToken, config.jwt.REFRESH_TOKEN_SECRET, async (err, data) => {
    if (err) return res.sendStatus(403)
    const user = await UserModel.findOne({_id: data.user._id})
    const accessToken = generateAccessToken(user, new Date())
    res.status(200).json({accessToken, user: user})
  })
}

exports.logout = async (req, res) => {
  await refreshTokenModel.deleteOne({refreshToken: req.body.refreshToken})

  res.status(204)
}

function generateAccessToken(user, date) {
  return jwt.sign({user, createdAt: date}, config.jwt.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
}

async function generateRefreshToken(user, date) {
  const refreshToken = jwt.sign({user, createdAt: date}, config.jwt.REFRESH_TOKEN_SECRET)
  await new refreshTokenModel({refreshToken}).save()
  return refreshToken
}