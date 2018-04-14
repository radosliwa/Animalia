



//-----------------------------------------GLOBAL ARRAYS


var animalGallery = ['assets/images/animal-dog.jpg', 'assets/images/animal-racoon.jpg',
'assets/images/animal-cat.jpg'];
var index;
var animalArray = ['dog','racoon', 'cat'];

$(function(){

  var gameOpens = (function(){
    $('#start').fadeTo('slow', 1)
    .click(function(){startGame();});
  })();


  var startGame = function(){
    $('#start').hide();
    $('.gamearea').fadeTo('fast', 1);

    getUserChoice();
    //console.log(animalGallery[index]);
    showAnimal();
  };



  //-------------------------------------GAME BEGINS

  var getUserChoice = function(){
    $('.cell').click(function(){
      //$('.message').removeClass('animated bounceInLeft');
      var userChoice = $(this).children().text();



      if(animalGallery[index].includes(userChoice)){
        $(this).addClass('cell__flipped');

        $('.cell').off('click');
        $('.front').addClass('front__non-hover');
        $('.message').addClass('animated bounceInLeft').show().delay(600).text('good job!').delay(500) //needed first delay to keep message still for a sec
        .one('animationend', function(){

          $(this).addClass('animated bounceOutUp');
          $('.animal').fadeOut(800);

        }); //with on() fadeOut would fire even after else

        setTimeout(()=>{
          $(this).removeClass('cell__flipped');
          $('.front').removeClass('front__non-hover').attr('style', "");
          $('.message').removeClass('animated bounceInLeft bounceOutUp').text("");
          getUserNextChoice();
        }, 2000);

        } else{
``
          $('.front').addClass('front__non-hover');
          $('.message').addClass('animated bounceInLeft').show().delay(1100).text('wrong, try again!').hide(600)
            .one('animationend',function(){
              $(this).removeClass('animated bounceInLeft');
              $('.front').removeClass('front__non-hover');

            });
        }
      });
    }

    var getUserNextChoice = function(){

      animalGallery.splice(index,1) // to avoid repeats

      showAnimal();


      if(animalGallery.length<1){     //-----------------GAME ENDS
        $('.gamearea').fadeOut(1000);
        setTimeout(function(){
          $('.finalMessage').css({display:"flex"}).show().fadeOut(1800).queue(function(){
            location.reload();//from server, not cache
          });
        }, 1000);
      }
      getUserChoice();
    }

    var showAnimal = function(){

      index = Math.floor(Math.random()*animalGallery.length);
      $('.animal').attr('src',animalGallery[index]).fadeIn();

      console.log(animalGallery[index]);
    };


  });
