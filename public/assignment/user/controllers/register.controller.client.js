/**
 * Created by vyshaalnarayanam on 2/16/17.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;

        vm.register = register;

        function init() {
        }
        init();

        function register(user) {
            if(user == null) {
                vm.error = "Please enter a valid username";
                return;
            }

            if(user.password == null){
                vm.error = "Please enter a valid password";
                return;
            }

            if(user.password != user.password2){
                vm.error = "Please check the password entered";
                return;
            }

            var u = UserService.findUserByUsername(user.username);

            if(u) {
                vm.error = "Username not available, try again";
            } else {
                u = UserService.createUser(user);
                if (u){
                    vm.message = "Succesfully registered";
                    $location.url("/user/"+user._id);
                } else{
                    vm.error = "Registration failed, try again!!!";
                }
            }
        }
    }
})();