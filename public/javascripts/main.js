$(document).ready(function(){
  //load a list of all games in the database
  function loadListGames(){
    $.ajax({
        url: '/gameRoute/loadGames', //the URL to your node.js server that has data
        dataType: 'json',
        cache: false
    }).done(function(data){
      data.forEach(function(item) {
        if ( $("#"+item._id).length === 0 ){
          var element = $('<div id="'+ item._id + '" class="resulLine content columns is-8 box" id="59795abc3fb2781ca1e67df6" name="lineResult">'
          +'<h5 class="titleGame is-6 column">'+item.title+'</h5>'
          +'<div class="buttons column">'
          +'<button class="removeGame is-pulled-right button is-2 is-danger is-small" value="'+item._id+'"> Remover </button>'
          +'<button class="updateGame is-pulled-right button is-warning is-small"> Alterar Jogo </button>'
          +'</div>');
          +'</div>'
          $("#showList").prepend(element);
        }
      });
    });
}

loadListGames();
  $(function(){
    $("#showList").on("click", "button.removeGame", function(){
      var parameters = {id: $(this).val()};
      $(this).parents().eq(1).html("<p style='color:red'>Jogo removido</p>").fadeOut("slow");
        $.get('/gameRoute/removeGame', parameters, function(data){
        });
    });
  });

  $(function(){
    $('#sendNewGame').on('click', function(e){
     var parameters = { nameGame: $('#nameGame').val() };
       $.post('/gameRoute/insertGame',parameters, function(data) {
         var aux = $('#sendNewGame').clone();
         $('#sendNewGame').replaceWith('<a id="sendNewGame" class="button is-medium is-success">Success</a>');
         setTimeout(function(){ $('#sendNewGame').replaceWith(aux) }, 3000);
         $('#nameGame').val('');
       loadListGames();
     });
   });
  });

  $(function(){
    $("#showList").on("click", "button.updateGame", function(){
      if($(this).parents().children('.updateName').length == 0){
        $(this).parent().append('<div class="updateName">'
                    +'<input type="text" class="updateText input" name="newName" placeholder="Digite o novo nome aqui">'
                  +'</div>');
      }else{
        $(this).parents().children('.updateName').remove();
      }
        $(".updateText").on('keyup', function(e){
          if(e.keyCode === 13) {
          var parameters = {id: $(this).parents().eq(2).get(0).id, newName: $(this).val()};
          $.get('/gameRoute/updateGame', parameters, function(data){

          });
            $(this).parents().eq(2).find(".titleGame").text($(this).val());
            $(this).parent().remove();
          }
          else if(e.keyCode === 27){
            $(this).parent().remove();
          }
        });
    });
  });
});
