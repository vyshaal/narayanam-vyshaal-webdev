/**
 * Created by vyshaalnarayanam on 2/16/17.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, PageService, $location) {
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var vm = this;

        vm.addPage = addPage;

        function init() {
            vm.websiteId = websiteId;
            vm.userId = userId;

            PageService
                .findPageByWebsiteId(websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                });
        }
        init();

        function addPage(page) {
            if (page == null || page.name == null){
                vm.error = "Page Name cannot be empty";
                return;
            }
            page.developerId = userId;
            page.updated = new Date();
            var promise = PageService.createPage(websiteId, page);
            promise
                .success(function (success) {
                    vm.message = "Added Successfully";
                    $location.url("/user/" + userId + "/website/"+websiteId+"/page");
                })
                .error(function (error) {
                    vm.error = "Unable to add the page";
                });
        }
    }
})();