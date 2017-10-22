
var friends = require('/home/saam/development/FriendFinder/app/data/friends.js');
var sumUser = 0;

module.exports = function (app) {
  app.get('/api/friends', function (req, res) {
    res.json(friends);
  });
// Create New Characters - takes in JSON input
  app.post('/api/friends', function (req, res) {
    var newFriend = req.body;
    friends.push(newFriend);
    console.log(matches(friends, newFriend));
    res.json(matches(friends, newFriend));
  });
};

function matches (friends, newFriend) {
  var diff = [];
  var totalDiff = 0;
  var sum = 0;
  for (var i = 0; i < friends.length - 1; i++) {
    for (var j = 0; j < friends[i].scores.length; j++) {
      sum = sum + parseInt(friends[i].scores[j]);
      sumUser = sumUser + parseInt(newFriend.scores[j]);
    }
    totalDiff = Math.abs(sumUser - sum);
    var match = {
      name: friends[i].name,
      photo: friends[i].photo,
      diff: totalDiff
    };
    diff.push(match);
    sum = 0;
    sumUser = 0;
  }
  diff.sort(function (a, b) {
    return parseInt(a.diff) - parseInt(b.diff);
  });
  return diff[0];
}
