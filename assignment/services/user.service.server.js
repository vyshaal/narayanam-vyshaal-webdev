/**
 * Created by vyshaalnarayanam on 3/2/17.
 */

module.exports = function (app) {
    app.post("/api/user", createUser);
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    var count = 1000; // userids
    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alice@wonder.com"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bob@marley.com"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "charly@garcia.com"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jose@annunzi.com" }
    ];

    function createUser(req, res) {
        var user = req.body;
        ++count;
        user._id = count.toString();
        users.push(user);
        console.log(user);
        res.json(user);
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        for (var u in users){
            if (users[u]._id == userId){
                users.splice(u,1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;
        console.log(newUser);
        for(var u in users) {
            if( users[u]._id == userId ) {
                users[u].firstName = newUser.firstName;
                users[u].lastName = newUser.lastName;
                res.json(users[u]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        var user = users.find(function (u) {
            return u._id == userId;
        });
        res.json(user);
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username && password) {
            findUserByCredentials(req, res);
        } else if(username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var user = users.find(function (u) {
            return u.username == req.query.username;
        });
        console.log(user);
        if(user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    }

    function findUserByCredentials(req, res){
        var username = req.query.username;
        var password = req.query.password;
        console.log("find user by credentials HTTP service");
        var user = users.find(function(user){
            return user.password == password && user.username == username;
        });
        console.log(user);
        res.json(user);
    }
}