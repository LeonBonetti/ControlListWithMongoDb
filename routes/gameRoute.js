const express = require('express')
const router = express.Router()
const dbIn = require('../dbInterations/functions')


router.post('/insertGame', (req, res) =>{
  let nome = req.body.nameGame;
  dbIn.insertGame(nome);
  res.send(" foi inserido o jogo " + nome);
})

router.get('/removeGame', (req, res) =>{
  let id = req.query.id;
  console.log("Chegou isso aqui ó: "+id);
  dbIn.removeGame(id);
  res.send("Jogo removido com sucesso");
});

router.get('/loadGames', (req, res) => {
  dbIn.Game.find().lean().exec(function(err, data){
    res.send(JSON.parse(JSON.stringify(data)));
    });
});

router.get('/updateGame', (req, res) =>{
  let id = req.query.id;
  let title = req.query.newName;
  console.log("Chegou aqui: id: "+id+" newName: "+ title);
  dbIn.updateGame(id, title);
  res.send(title);
})


module.exports = router
