const { default: axios } = require('axios');
var express = require('express');
const db = require('../models');
var router = express.Router();

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
    .then(function(poke){

      res.render('pokemon/index.ejs', {pokemon: poke});
  } )
});



//GET /pokemon/:id - renders a show page with detail info for each Pokemon
router.get('/:id', (req, res) => {
  // console.log("+++++++", req.params.id)
  db.pokemon.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(poke){
    const name = poke.name
    
    axios.get(`http://pokeapi.co/api/v2/pokemon/${name}`)
    .then(function(apiResponse){
      
      let pokemon = apiResponse.data
      // console.log(pokemon)
      // console.log(pokemon.name)
      // console.log(pokemon.species.name)
      // console.log(pokemon.sprites.back_shiny)
      console.log(pokemon.abilities[0].ability.name)

      res.render('pokemon/show.ejs', {pokeInfo: pokemon})
    }).catch((error)=> {
      console.log('Error: ', error)
    })
  })
  
} )


// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    }
  }).then(function(poke){

    res.redirect('/pokemon');
  })
});

module.exports = router;