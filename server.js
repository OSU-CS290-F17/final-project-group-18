/*--------------------creating server------------------------------*/
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express();

var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = process.env.MONGO_USER;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB;

var mongoURL = 'mongodb://' + mongoUser + ':' + mongoPassword +
  '@' + mongoHost + ':' + mongoPort + '/' + mongoDBName;

var mongoConnection = null;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());

app.use(express.static('public', { index : false }));

app.get('/', function (req, res) {
  var postData = mongoConnection.collection('postData');
  console.log("hello from 86");
  postData.find({}).toArray(function (err, results) {
    if (err) {
      res.status(500).send("Error fetching posts from DataBase.");
      console.log("Error branch.....");
    } else {
      console.log("== query results length:", results.length);
      res.status(200).render('postsPage', {
        posts: results
      });
    }
  });
});

app.get('/:n', function (req, res) {
  var n = req.params.n;
  var postData = mongoConnection.collection('postData');

  postData.find({}).toArray(function (err, results) {
    if (err) {
      res.status(500).send("Error fetching posts from DataBase.");
    } else {
      if (n <= results.length) {
        console.log("== query results:", results);
        res.status(200).render('singlePost', {
          post: results[n]
        });
      } else {
        res.status(404).render('404');
      }
    }
  });
});

app.get('*', function (req, res) {
  res.status(404).render('404');
});

app.post('/addPost', function (req, res) {

  if (req.body.description && req.body.photoURL && req.body.comment) {
    var postData = mongoConnection.collection('postData');
    var postObject = {
      comment: req.body.comment,
      photoURL: req.body.photoURL,
      description: req.body.description
    };
    console.log(postObject);

    postData.insert(
      postObject,
      function (err, result) {
        if (err) {
          res.status(500).send("Error fetching posts from DataBase.");
        } else {
          res.status(200).send("Successfully Added Post.");
        }
      }
    )
  } else {
    res.status(400).send("Request body not filled out.");
  }
});

app.post('*', function (req, res) {
  res.status(404).render('404');
});

app.delete('/delete/:n', function(req, res) {
  var postData = mongoConnection.collection('postData');
  var n = req.params.n;

  postData.find({}).toArray(function (err, results) {
    if (err) {
      res.status(500).send("Error fetching posts from DataBase.");
    } else {
      if (n <= results.length) {
        console.log("== query results:", results);
        postData.remove(
          { _id: results[n]._id },
          function (err, result) {
            if (err) {
              res.status(500).send("Error fetching posts from DataBase.");
            } else {
              res.status(200).send("Successfully Added Post.");
            }
          }

        );
      } else {
        res.status(400).send("Post does not exist. It cannot be deleted.");
      }
    }
  });
});

app.delete('*', function(req, res) {
  res.status(404).render('404');
});

/*---------------------Specifying Port-----------------------------*/
var port = process.env.PORT || 3000; // If port isn't specified then use 3000 as default.

MongoClient.connect(mongoURL, function (err, connection) {
  if (err) {
    throw err;
  }
  mongoConnection = connection;
  app.listen(port, function () {
    console.log("== Server listening on port:", port);
  });
});
