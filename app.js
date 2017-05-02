var restify = require('restify');
var builder = require('botbuilder');
var mysql = require('mysql');
var services = require('./controllers/services');

//
// BOT SETUP
//

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3979, function(){
	console.log("Starting server");
	console.log('%s listening to %s', server.name, server.url);
});

// Database connection
var connection = mysql.createPool({
	host: 'prohosting3.netsons.net',
	port: '3306',
	user: 'mjhnxzbg_test',
	password: '@Password1.',
	database: 'mjhnxzbg_test1'
});

//Create chat bot
var connector = new builder.ChatConnector({
	appId: '768231e9-c384-4f09-985e-d24834ecb241',
	appPassword: 'UcbkfkmiNCjaJQzqdbceEKC'
});

var bot = new builder.UniversalBot(connector);
server.post('/api/v1/messages', connector.listen());

// LUIS
/**/
var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/4163908c-a863-46b2-b5cc-dd4fee5a7ec2?subscription-key=728ad137437444a6b90797a5f388f685&timezoneOffset=0&verbose=true&q=';
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });

bot.dialog('/', dialog);


// Add intent handlers
dialog.matches('BestTeam', [
	function (session, args, next) {
        // Resolve and store any entities passed from LUIS.
        connection.getConnection(function(error, tempcont){
		if(error){
			//tempcont.release();
			console.log('Error');
			console.log(error);
			session.send('Errore.');

		}else{
			console.log('Connected! WELL DONE!');
			var query = "SELECT * FROM mySampleTable";

			tempcont.query(query, function(error, rows, fields){

				tempcont.release();

				if(!!error){
					console.log('Error in the query');
					console.log(error)
					session.send('Errore.');
				}else{
					if(rows.length == 0){
						session.send('Errore.');
					}
					var utente = rows[0];
					session.send("Il migliore è " + utente.NAME);
				}
			})
		}
		});
    }
    ]);
dialog.matches('IncaniResponse', builder.DialogAction.send('Gay'));
dialog.matches('NonFa', builder.DialogAction.send('15 più 18 non fa 36! Dio ti maledica! Te do un scjafon che te pituro su pel muro! TU MARE PUTTANA! 15 e 18 quanto fa COGLIONE!'));
dialog.matches('None', builder.DialogAction.send('Non ho capito. Dai scrivimi altro!'));

dialog.matches('Saluto', 
	[
		function(session, args, next){
			services.randomSaluto(function (err, data) {
			    if (err) {
			        console.log(err);
			    } else {
			        session.send(data);
			    }
			}); 
		}
	]
);

dialog.matches('Offesa', 
	[
		function(session, args, next){
			services.randomOffesa(function (err, data) {
			    if (err) {
			        console.log(err);
			    } else {
			        session.send(data);
			    }
			}); 
		}
	]
);
dialog.matches('Ringraziamento', builder.DialogAction.send('Grazie mulo!'));




dialog.onDefault(builder.DialogAction.send("I'm sorry I didn't understand. I can only create & delete alarms."));


process.on('uncaughtException', function (err) {
    console.log(err);
}); 




//
// BOT DIALOGS
//
/*
bot.dialog('/', function(session){
	session.send("Hello World! Ciao a tutti :)");
});
*/