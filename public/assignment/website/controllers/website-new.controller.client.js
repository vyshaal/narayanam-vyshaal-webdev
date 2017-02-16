/**
 * Created by vyshaalnarayanam on 2/16/17.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, WebsiteService) {
        var vm = this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;

        function init() {
            var websites = WebsiteService.findWebsitesByUser(userId);

            vm.websites = websites;
            vm.userId = userId;
        }
        init();

        // event handlers
        vm.addWebsite = addWebsite;

        // add method
        function addWebsite(website) {
            console.log(website);
            if (website == null || website.name == null){
                vm.error="Enter valid website name";
                return;
            }
            var success = WebsiteService.createWebsite(vm.userId, website);
            if (success) {
                vm.message = "Succesfully added website";
                init();
            } else{
                vm.error = "Failed to add the website, try again!!!";
            }
        }
    }
})();