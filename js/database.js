var mysql      = require('mysql');
var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : '127.0.0.1',
    user     : 'root',
    password : 'vikas',
    database : 'city',
    debug    :  false
});

function getDoctersNames(callback){
    pool.getConnection(function(err,connection){
        if (err) {
          console.log('Error in connection database');
          return;
        }
        connection.query('Select name from docter',function(err,rows){
            //connection.release();
            if(!err) {
                if(rows && rows.length>0){
                  connection.release();
                  return callback(false,rows, 'data available');
                }
                else{
                  connection.release();
                  return callback(false,null,'no data available');
                }
                  }
                else{
                  connection.release();
                  return callback(true,'error',err);
                }
        });

        connection.on('error', function(err) {
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;
        });
    });
}


function getDocters(docterName,startDate,endDate,callback){
    pool.getConnection(function(err,connection){
        if (err) {
          console.log('Error in connection database');
          return;
        }
        if(docterName){
            var queryString = 'SELECT pati.name,pati.referred_by,COUNT(CASE WHEN pati.test = '+ mysql.escape('Mri')+' THEN pati.test END) AS mri,COUNT(CASE WHEN pati.test = '+ mysql.escape('City')+' THEN pati.test END) AS city,COUNT(CASE WHEN pati.test = ' + mysql.escape('X-ray')+' THEN pati.test END) AS xray,(SUM(CASE WHEN pati.test = ' + mysql.escape('City')+' THEN (pati.fees*t.city)/100 ELSE 0 END) +SUM(CASE WHEN pati.test = '+mysql.escape('mri')+' THEN (pati.fees*t.mri)/100 ELSE 0 END) +SUM(CASE WHEN pati.test = '+mysql.escape('X-ray')+' THEN (pati.fees*t.xray)/100 ELSE 0 END)) AS commission,SUM(pati.fees) AS amount FROM docter doc LEFT JOIN patient pati ON doc.docter_id = pati.docter_id AND  pati.date BETWEEN '+ mysql.escape(startDate)+' AND '+mysql.escape(endDate) + ' JOIN test t WHERE doc.name = '+mysql.escape(docterName)+' GROUP BY  pati.referred_by,pati.name';
        }
        else{
          var queryString = 'SELECT doc.name,pati.referred_by,COUNT(CASE WHEN pati.test = '+ mysql.escape('Mri')+' THEN pati.test END) AS mri,COUNT(CASE WHEN pati.test = '+ mysql.escape('City')+' THEN pati.test END) AS city,COUNT(CASE WHEN pati.test = ' + mysql.escape('X-ray')+' THEN pati.test END) AS xray,(SUM(CASE WHEN pati.test = ' + mysql.escape('City')+' THEN (pati.fees*t.city)/100 ELSE 0 END) +SUM(CASE WHEN pati.test = '+mysql.escape('mri')+' THEN (pati.fees*t.mri)/100 ELSE 0 END) +SUM(CASE WHEN pati.test = '+mysql.escape('X-ray')+' THEN (pati.fees*t.xray)/100 ELSE 0 END)) AS commission,SUM(pati.fees) AS amount FROM docter doc LEFT JOIN patient pati ON doc.docter_id = pati.docter_id AND  pati.date BETWEEN '+ mysql.escape(startDate)+' AND '+mysql.escape(endDate) + 'JOIN test t GROUP BY  doc.name';
        }
        connection.query(queryString,
        function(err,rows){
            //connection.release();
            if(!err) {
                console.log(rows);
                if(rows && rows.length>0){
                  connection.release();
                  return callback(false,rows, 'data available');
                }
                else{
                  connection.release();
                  return callback(false,null,'no data available');
                }
                  }
                else{
                  connection.release();
                  return callback(true,'error',err);
                }
        });

        connection.on('error', function(err) {
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;
        });
    });
}

function getCommission(callback){
    pool.getConnection(function(err,connection){
        if (err) {
          console.log('Error in connection database');
          return;
        }
        connection.query('SELECT * from test',
        function(err,rows){
            //connection.release();
            if(!err) {
                console.log(rows);
                if(rows && rows.length>0){
                  connection.release();
                  return callback(false,rows, 'data available');
                }
                else{
                  connection.release();
                  return callback(false,null,'no data available');
                }
                  }
                else{
                  connection.release();
                  return callback(true,'error',err);
                }
        });

        connection.on('error', function(err) {
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;
        });
    });
}

function insertComission(data,callback){
    pool.getConnection(function(err,connection){
        if (err) {
          console.log('Error in connection database');
          return;
        }

        connection.query('UPDATE test SET value = ? WHERE name = ?',[data.value, data.name],function(err,rows){
            //connection.release();
            if(!err) {
                console.log(rows);
                if(rows){
                  console.log(rows);
                  connection.release();
                  return callback(true, rows);
                }
                }
                else{
                    connection.release();
                  return callback(false, err);
                }

        });

        connection.on('error', function(err) {
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;
        });
    });
}
