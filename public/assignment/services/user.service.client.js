/**
 * Created by vyshaalnarayanam on 2/16/17.
 */

(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);

    function userService() {
        var count = 1000;
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];
        var api = {
            "findUserByCredentials": findUserByCredentials,
            "findUserByUsername": findUserByUsername,
            "findUserById": findUserById,
            "updateUser": updateUser,
            "createUser": createUser,
            "deleteUser": deleteUser
        };
        return api;

        function deleteUser(userId) {
            for (var u in users){
                if (users[u]._id == userId){
                    users.splice(u,1);
                    return true;
                }
            }
            return false;
        }

        function findUserByUsername(username){
            for(var u in users) {
                if(users[u].username == username ) {
                    return users[u];
                }
            }
            return null;
        }

        function createUser(user) {
            user._id = ++count;
            users.push(user);
            return user;
        }

        function updateUser(userId, newUser) {
            for(var u in users) {
                if( users[u]._id == userId ) {
                    users[u].firstName = newUser.firstName;
                    users[u].lastName = newUser.lastName;
                    users[u].email = newUser.email;
                    return users[u];
                }
            }
            return null;
        }

        function findUserById(userId) {
            for(var u in users) {
                if( users[u]._id == userId ) {
                    return users[u];
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                if(users[u].username == username && users[u].password == password ) {
                    return users[u];
                }
            }
            return null;
        }

    }
})();