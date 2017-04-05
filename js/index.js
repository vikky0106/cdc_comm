var msg = document.getElementById('message');
var table = document.getElementById("reports");
var tblBody = document.getElementById("tbody");

$( "#printData" ).click(function() {
 sendCommandToWorker({tableData :table.innerHTML, docterName: $("#docter").val(), date: ("From "+$("#startDate").val() +" To " + $("#endDate").val()) });
});


function showAllDocter(){
 $("tbody").children().remove();
   var startDateParts =$("#startDate").val().split('/');
   var startDate = new Date(startDateParts[2],startDateParts[1]-1,startDateParts[0]);

   var docterName = $("#docter").val();

   if(docterName){
        $("#name").text('Patient Name');
   }
   else{
      $("#name").text('Docter Name');   
   }
   
   var parts =$("#endDate").val().split('/');
   var endDate = new Date(parts[2],parts[1]-1,parts[0]);
       endDate.setDate(endDate.getDate() + 1);
  getDocters(docterName,startDate,endDate,function(err, data, info){
     if(err){
       console.log(info);
     }else{
         var i =0;
         var amount = 0;
         var totalIncentives = 0;
         data.forEach(function(eachData){
           if(eachData.amount > 0){
             var row = table.insertRow(0);
             if(i%2 == 0){
                    row.className="odd";
                   }
                  var cell0 = row.insertCell(0);
                  var cell1 = row.insertCell(1);
                  var cell2 = row.insertCell(2);
                  var cell3 = row.insertCell(3);
                  var cell4 = row.insertCell(4);
                  var cell5 = row.insertCell(5);

                  cell0.innerHTML = eachData.name;
                  cell1.innerHTML = eachData.mri;
                  cell2.innerHTML = eachData.xray;
                  cell3.innerHTML = eachData.city;
                  cell4.innerHTML = '&#8377;' + eachData.amount;
                  cell5.innerHTML = '&#8377;' + eachData.commission;

                  amount = amount + eachData.amount;
                  totalIncentives = totalIncentives+ eachData.commission;

                  tblBody.appendChild(row);
                  table.appendChild(tblBody);
                     i++;
            if(i === data.length){
                var row = table.insertRow(-1);
                var cell0 = row.insertCell(0);
                var cell1 = row.insertCell(1);
                var cell2 = row.insertCell(2);
                var cell3 = row.insertCell(3);
                var cell4 = row.insertCell(4);
                var cell5 = row.insertCell(5);
                cell0.innerHTML = 'Total'.bold();

                cell5.innerHTML =  '&#8377;' + totalIncentives ;
                cell4.innerHTML = '&#8377;' + amount ;
                

                tblBody.appendChild(row);
                table.appendChild(tblBody);
                       
                     }
           }
             
         });
     }
  });

}
