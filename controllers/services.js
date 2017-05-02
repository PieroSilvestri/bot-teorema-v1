var mysql = require('mysql');

// Database connection
var connection = mysql.createPool({
	host: 'prohosting3.netsons.net',
	port: '3306',
	user: 'mjhnxzbg_test',
	password: '@Password1.',
	database: 'mjhnxzbg_munsrabot'
});


var sum = function(a, b) { //definiamo la funzione sum
  return a+b; 
}

var timeoutProva = function (delay) {  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, delay)
  })
}
 
var randomSaluto = function (callback) {
    connection.getConnection(function(error, tempcont){
			if(error){
				//tempcont.release();
				console.log('Error');
				console.log(error);
				return 'Errore.';

			}else{
				console.log('Connected! WELL DONE!');
				var query = "SELECT * FROM bot_saluto";

				tempcont.query(query, function(error, rows, fields){

					tempcont.release();

					if(!!error){
						console.log('Error in the query');
						console.log(error)
						callback(error, null);
					}else{
						if(rows.length == 0){
							session.send('Errore.');
						}
						var x = (Math.floor((Math.random() * rows.length) + 1) - 1);
						var tempString = rows[x];
						console.log("x: " + x + " tempString testo: " + tempString.TESTO);
						callback(null, tempString.TESTO);
					}
				})
			}
		});
}

var randomOffesa = function (callback) {
    connection.getConnection(function(error, tempcont){
			if(error){
				//tempcont.release();
				console.log('Error');
				console.log(error);
				return 'Errore.';

			}else{
				console.log('Connected! WELL DONE!');
				var query = "SELECT * FROM bot_offesa";

				tempcont.query(query, function(error, rows, fields){

					tempcont.release();

					if(!!error){
						console.log('Error in the query');
						console.log(error)
						callback(error, null);
					}else{
						if(rows.length == 0){
							session.send('Errore.');
						}
						var x = (Math.floor((Math.random() * rows.length) + 1) - 1);
						var tempString = rows[x];
						console.log("x: " + x + " tempString testo: " + tempString.TESTO);
						callback(null, tempString.TESTO);
					}
				})
			}
		});
}
 
var private = function(a,b) {
  return "Io sono private!!"; 
}
 
exports.sum = sum; //esportiamo la funzione sum
exports.timeoutProva = timeoutProva; //esportiamo la funzione product 
exports.randomSaluto = randomSaluto; //esportiamo la funzione product 
exports.randomOffesa = randomOffesa;