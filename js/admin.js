  $('input').keypress(function(e) {
          if(e.which == 13) {
              jQuery(this).blur();
              jQuery('#login').focus().click();
          }
      });

  var username = document.getElementById('username');
  var password = document.getElementById('password');
  var btnLogin = document.getElementById('login');
  var checkBox = document.getElementById("checkbox");

  var msg = document.getElementById('message');

  btnLogin.addEventListener('click' , function(){
    var email = username.value;
    var pass =  password.value;
    isAuthenticated(email, pass, function(isAuthenticated, data){
      if(isAuthenticated){
        location.href = "home.html";
      }
      else{
        console.log("HIIIIIIIIIIIIIIIIIIIIIIIIIIIIII");
        msg.className='alert alert-danger text-center show';
        msg.innerHTML = 'Invalid username and password';
        setTimeout(function() {
                          $('#message').removeClass('show').fadeOut('fast').hide();
                        }, 2000);
      }
    });

  });
