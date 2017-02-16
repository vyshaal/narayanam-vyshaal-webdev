/**
 * Created by vyshaalnarayanam on 2/16/17.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, $location, UserService) {
        var vm = this;

        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        var userId = $routeParams['uid'];

        function init() {
            var user = UserService.findUserById(userId);
            vm.user = user;
        }
        init();

        function updateUser(newUser) {
            var user = UserService.updateUser(userId, newUser);
            if(user != null) {
                vm.message = "Successfully updated the user information"
            } else {
                vm.error = "Failed to update the User!!!";
            }
        }

        function deleteUser() {
            var success = UserService.deleteUser(userId);
            if (success)
                $location.url("/login");
            else
                vm.error = "Failed to delete the User!!!";
        }
    }
})();