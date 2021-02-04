const UserModel = require('../models/user.model')

exports.addMortage = async (req, res) => {
  if (!req.isAuth) {
    return res.sendStatus(403)
  }

  const user = await UserModel.findOne({_id: req.userId})
  
  if (!user) {
    return res.status(400).json({success: false, msg: 'User not found'})
  }

  const newMortage = req.body.mortage

  user.mortages = [...user.mortages, newMortage]

  try {
    const updatedUser = await user.save()
    
    res.status(200).json({success: true, user: updatedUser._doc})
  } catch (err) {
    res.status(400).json({success: false})
  }
} 

exports.removeMortage = async (req, res) => {
  if (!req.isAuth) {
    return res.sendStatus(403)
  }

  const user = await UserModel.findOne({_id: req.userId})
  
  if (!user) {
    return res.status(400).json({success: false, msg: 'User not found'})
  }

  const newMortage = req.body.mortage

  user.mortages = user.mortages.filter((mortage) => {
    if (mortage.id !== req.params.mortageId) {
      return mortage
    }
  })

  try {
    const updatedUser = await user.save()
    
    res.status(200).json({success: true, user: updatedUser._doc})
  } catch (err) {
    res.status(400).json({success: false})
  }
} 