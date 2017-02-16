/**
 * Created by vyshaalnarayanam on 2/16/17.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, WebsiteService, $location) {
        var vm = this;

        function init() {
            var userId = $routeParams.uid;
            var websiteId = $routeParams.wid;
            var websites = WebsiteService.findWebsitesByUser(userId);

            vm.websites = websites;
            vm.userId = userId;
            vm.website = WebsiteService.findWebsiteById(websiteId);
        }
        init();

        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function deleteWebsite() {
            var success = WebsiteService.deleteWebsite(vm.website._id);
            if (success) {
                $location.url("/user/"+vm.userId+"/website");
            } else {
                vm.error = "Failed to delete the website, try again!";
            }
        }

        function updateWebsite(website) {
            var success = WebsiteService.updateWebsite(vm.website._id, vm.website);
            if (success) {
                vm.message = "Successfully updated the website"
            } else {
                vm.error = "Failed to update the website, try again!";
            }
        }
    }
})();