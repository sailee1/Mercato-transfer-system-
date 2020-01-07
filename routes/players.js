const express = require('express')
const router = express.Router()
const Player = require('../models/player')


// All Authors Route
router.get('/', async (req, res) => {
  let searchOptions = {}
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  try {
    const players = await Player.find(searchOptions)
    res.render('./players/index', {
      players: players,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }
})

// New Author Route
router.get('/new', (req, res) => {
  res.render('./players/new', { player: new Player() })
})

// Create Author Route
router.post('/', async (req, res) => {
  const player = new Player({
    name: req.body.name,
    club: req.body.club,
    position: req.body.position,
    nationality: req.body.nationality,
    age: req.body.age
  })
  try {
    const newPlayer = await player.save()
    res.redirect(`./players/${newPlayer.id}`)
  } catch {
    res.render('./players/new', {
      player: player,
      errorMessage: 'Error creating Player'
    })
  }
})

router.get('/:id', async (req, res) => {
try{
  const player = await Player.findById(req.params.id)
  res.render('./players/show', {player: player})
}  catch{
  res.redirect('/')
}
})


router.get('/:id/edit', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id)
    res.render('./players/edit', { player: player })
  } catch {
    res.redirect('./players')
  }
})


 router.put('/:id', async (req, res) => {
  let player
  try {
    player = await Player.findById(req.params.id)
    player.club = req.body.club
    await player.save()
    res.redirect(`/players/${player.id}`)
  } catch {
    if (player == null) {
      res.redirect('/')
    } else {
      res.render('./players/edit', {
        player: player,
        errorMessage: 'Error updating Player'
      })
    }
  }
}) 

/* router.delete('/:id', (req, res) =>{
  res.send ('delete player ' + req.params.id)
}) */

 router.delete('/:id', async (req, res) => {
  let player
  try {
    player = await Player.findById(req.params.id)
    await player.remove()
    res.redirect('/players')
  } catch {
    if (player == null) {
      res.redirect('/')
    } else {
      res.redirect(`./players/${player.id}`)
    }
  }
})   
module.exports = router