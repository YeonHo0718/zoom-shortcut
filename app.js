const express = require('express');
const app = express();
const urlData = {};
var bodyParser = require('body-parser');

require('dotenv').config();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(express.static('public'));

app.get('/', function (req, res) {
	res.sendFile(__dirname+'/public/main.html');
});

app.get('/z/:id', function(req,res){
	console.log(req.params.id)
	const names = Object.keys(urlData);
	
	if(names.includes(req.params.id)){
		const agent = req.header('User-Agent');  //모바일 PC 환경 인식을 위해
		const idCode = urlData[req.params.id].id;  //zoom room code
		const pw = urlData[req.params.id].pw;  //zoom room password
		let scheme = '';
		if(agent.indexOf("Mobi")!=-1){
			scheme = "zoomus://zoom.us/join?confno="+idCode+"&pwd="+pw;
		}else{
			scheme = "zoommtg://zoom.us/join?confno="+idCode+"&pwd="+pw;
		}
		res.send(`
		<html>
			<head></head>
			<body style='display: flex; justify-content: center; align-items: center; min-height: 100vh;'>
				<a href=${scheme}>이동이 안되셨다면 이곳을 눌러주세요.</a>
				<script>
					self.onload = function init() {
						if ( self==top ) {
							window.location.href = '${scheme}';
						}
					}
				</script>
			</body>
		</html>
		`)
	}else{
		res.send('cannot find such name');
	}
})

app.post('/makeZoom',function(req,res){
	const agent = req.header('User-Agent');
	const name = req.body.name;
	const id = req.body.id;
	const pw = req.body.pw;
	urlData[name] = {
		id: id,
		pw: pw
	};
	res.redirect('/z/'+name);
})

app.listen(process.env.PORT, function() {
	console.log('Express server has started on port '+process.env.PORT);
});