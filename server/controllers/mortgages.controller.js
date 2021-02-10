const UserModel = require('../models/user.model')

exports.addMortgage = async (req, res) => {
  if (!req.isAuth) {
    return res.sendStatus(403)
  }

  const user = await UserModel.findOne({_id: req.userId})
  
  if (!user) {
    return res.status(400).json({success: false, msg: 'User not found'})
  }

  const newMortgage = req.body.mortgage

  user.mortgages = [...user.mortgages, newMortgage]

  try {
    const updatedUser = await user.save()
    
    res.status(200).json({success: true, user: updatedUser._doc})
  } catch (err) {
    res.status(400).json({success: false})
  }
} 

exports.removeMortgage = async (req, res) => {
  if (!req.isAuth) {
    return res.sendStatus(403)
  }

  const user = await UserModel.findOne({_id: req.userId})
  
  if (!user) {
    return res.status(400).json({success: false, msg: 'User not found'})
  }

  const newMortgage = req.body.mortgage

  user.mortgages = user.mortgages.filter((mortgage) => {
    if (mortgage.id !== req.params.mortgageId) {
      return mortgage
    }
  })

  try {
    const updatedUser = await user.save()
    
    res.status(200).json({success: true, user: updatedUser._doc})
  } catch (err) {
    res.status(400).json({success: false})
  }
} 