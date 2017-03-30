 var referredBy = document.getElementById('referredBy');
 const ipc = require('electron').ipcRenderer;
 getCommission(function(err, data, info){
     if(err){
       console.log(info);
     }else{
         var i =0;
         data.forEach(function(eachData){
           if(eachData.name === 'Mri'){
             $("#mri").val(eachData.value);
           }else if (eachData.name === 'X-ray'){
             $("#xray").val(eachData.value);
           }
           else if (eachData.name === 'City'){
             $("#city").val(eachData.value);
           }
         });
     }
 });

var btnSave = document.getElementById('save');
var msg = document.getElementById('message');

btnSave.addEventListener('click' , function(){
     if($("#mri").val() && $("#mri").val() !== 0){
          insertComission({
                          name : 'Mri',
                          value : $("#mri").val()
                         },function(result, val){
                            if(result){
                              console.log(val);
                             // sendCommandToWorker('<div align=center><h2>City Dignosis Center</h2> <p> Patient Name :' + patient.name +'</p> <p> Age :' +  patient.age +'</p> <p> Gender :' +  patient.sex +'</p> <p> ReferredBy :' +  patient.referred_by +'</p> <p> Test :' +  patient.test +'</p> <p> Date :' +  patient.date +'</p> <p> Fees :' +  patient.fees +'</p>  <h5>************Thankyou***************</h5></div>');
                              msg.className='alert alert-success text-center show';
                              msg.innerHTML = 'Success';
                              setTimeout(function() {
                                                $('#message').removeClass('show').fadeOut('fast').hide();
                                              }, 2000);
                            }
                            else{
                              console.log(val);
                              msg.className='alert alert-danger text-center show';
                              msg.innerHTML = 'Fail to save entry';
                              setTimeout(function() {
                                                $('#message').removeClass('show').fadeOut('fast').hide();
                                              }, 2000);
                            }
                          });
                              }

     if($("#city").val() && $("#city").val() !== 0){
                  insertComission({
                                  name : 'City',
                                  value : $("#city").val()
                               },function(result, val){
              if(result){
                console.log(val);
               // sendCommandToWorker('<div align=center><h2>City Dignosis Center</h2> <p> Patient Name :' + patient.name +'</p> <p> Age :' +  patient.age +'</p> <p> Gender :' +  patient.sex +'</p> <p> ReferredBy :' +  patient.referred_by +'</p> <p> Test :' +  patient.test +'</p> <p> Date :' +  patient.date +'</p> <p> Fees :' +  patient.fees +'</p>  <h5>************Thankyou***************</h5></div>');
                msg.className='alert alert-success text-center show';
                msg.innerHTML = 'Success';
                setTimeout(function() {
                                  $('#message').removeClass('show').fadeOut('fast').hide();
                                }, 2000);
              }
              else{
                console.log(val);
                msg.className='alert alert-danger text-center show';
                msg.innerHTML = 'Fail to save entry';
                setTimeout(function() {
                                  $('#message').removeClass('show').fadeOut('fast').hide();
                                }, 2000);
              }
            });
    }

     if($("#xray").val() && $("#xray").val() !== 0){
        insertComission({
                        name : 'X-ray',
                        value : $("#xray").val()
                     }, function(result, val){
                          if(result){
                            console.log(val);
                           // sendCommandToWorker('<div align=center><h2>City Dignosis Center</h2> <p> Patient Name :' + patient.name +'</p> <p> Age :' +  patient.age +'</p> <p> Gender :' +  patient.sex +'</p> <p> ReferredBy :' +  patient.referred_by +'</p> <p> Test :' +  patient.test +'</p> <p> Date :' +  patient.date +'</p> <p> Fees :' +  patient.fees +'</p>  <h5>************Thankyou***************</h5></div>');
                            msg.className='alert alert-success text-center show';
                            msg.innerHTML = 'Success';
                            setTimeout(function() {
                                              $('#message').removeClass('show').fadeOut('fast').hide();
                                            }, 2000);
                          }
                          else{
                            console.log(val);
                            msg.className='alert alert-danger text-center show';
                            msg.innerHTML = 'Fail to save entry';
                            setTimeout(function() {
                                              $('#message').removeClass('show').fadeOut('fast').hide();
                                            }, 2000);
                          }
                        });

    }
});
