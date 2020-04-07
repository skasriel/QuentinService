var express    =    require('express');
var app        =    express();
var fs = require('fs');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../Client'));

//require('./router/main')(app);
app.set('views',__dirname + '../Client');
console.log("Views = "+__dirname+'../Client');
//app.set('view engine', 'ejs');
//app.engine('html', require('ejs').renderFile);

var server = app.listen(80,function(){
    console.log("We have started our server on port 80");
});

var friends;/* = {
  "quentin": ["timothé", "alban", "daphné"],
  "papa": ["maman"]
};*/
var allUsers;

function loadAllFriends() {
  /*if (friends)
    return;*/
  var fileName="../friends.json";
  var friendsString = fs.readFileSync(fileName, 'utf8');
  friends = JSON.parse(friendsString);
  console.log("Friend list: "+friends);
  console.log("Friends of Quentin: "+friends["quentin"]);
}

function loadAllUsers() {
  allUsers = new Set();
  for (var name in friends) {
    allUsers.add(name);
    for (var i=0; i<friends[name].length; i++)
      allUsers.add(friends[name][i]);
  }
}

app.get('/friends', function(req, res) {
  loadAllFriends();
  var name = req.query.name;
  var password = req.query.password;
  if (!name)
    name = "Foobar";
  var myFriends = friends[name];
  if (!myFriends) {
    res.send("User "+name+" has no friends :(");
    return;
  }
  var html = "";
  html += "<html><body>";
  html += "Hello "+name+"<br>";
  html += "Your friends are: <br>";
  html += "<form action='/update' method='GET'>";
  html += "<input type='hidden' name='name' value='" + name + "'>";

  loadAllUsers();
  var myFriends = friends[name];
  var i=0;
  for (var user of allUsers) {
    if (user == name)
      continue;
    var isFriend = myFriends.includes(user);
    html += "<input type='checkbox' name='friend_"+i+"'";
    if (isFriend) {
      html +=  " checked='true' ";
      console.log("Does "+myFriends+" include "+user+" ? "+isFriend);
    }
    html += " value="+user+">";
    html += "<label for='friend_"+i+"'>" + user + "</label><br>";
    i++;
  };
  html += "<input type='submit' text='Update my Friends!'>";
  html += "</form></body></html>";
  res.send(html);
});

app.get('/update', function(req, res) {
  loadAllFriends();
  var name = req.query.name;
  var myFriends = []; //friends[name];
  var html = "";
  html += "<html><body>";
  for (var i=0; i<10; i++) {
    var friend = req.query['friend_'+i];
    if (friend) {
      myFriends.push(friend);
      html += "friend #"+i+" is " + friend + "<br>";
    }
  }
  friends[name] = myFriends;

  var fileName="../friends.json";
  var friendJson = JSON.stringify(friends);

  console.log("Saving to disk: "+friendJson);
  fs.writeFileSync(fileName, friendJson);
  console.log("Save complete");
  html += "</body></html>";
  res.send(html);
});
