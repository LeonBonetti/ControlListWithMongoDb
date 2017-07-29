var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/gameList' );

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});
var GameSchema = mongoose.Schema({
    title: String,
    imagePath: String
});

GameSchema.statics.findAll = function(cb) {
  return this.find({}, cb).lean().exec(function(err, games){
    if (err) return console.log(err);
  })
};

var Game = mongoose.model('Game', GameSchema);

module.exports.Game = Game;

//here a insert!
exports.insertGame = function(name){
  var newGame = new Game({
  title: name,
  imagePath: '../public/images/' + name + '.jpg'
  });

  newGame.save(function(err, thor) {
    if (err) return console.error(err);
    console.dir(thor);
  });
}
//insert finish

exports.updateGame = function(id, value){
  Game.findById(id, function (err, game) {
    if (err) return handleError(err);

    game.title = value;
    game.save(function (err, updatedgame) {
      if (err) return handleError(err);
      console.log(updatedgame);
    });
  });
}

exports.removeGame = function(id){
  Game.remove({_id: id}, function (err) {
  if (err) return handleError(err);
  console.log("Jogo removido com sucesso");
});
}

function tratarJson(callback){
  data = JSON.parse(JSON.stringify(callback));
  return data;
}

function findAll(callback){
  Game.find().lean().exec(function(err, data){
    if(err) return console.log(err);
    callback (data);
  })
}

//this function returns a variable data with json
module.exports.findAll = findAll(tratarJson);
