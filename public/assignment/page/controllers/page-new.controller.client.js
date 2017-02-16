/**
 * Created by vyshaalnarayanam on 2/16/17.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, PageService) {
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var vm = this;

        vm.addPage = addPage;

        function init() {
            vm.websiteId = websiteId;
            vm.userId = userId;

            vm.pages = PageService.findPageByWebsiteId(websiteId);
        }
        init();

        function addPage(page) {
            if (page == null || page.name == null){
                vm.error = "Add page name";
                return;
            }
            var success = PageService.createPage(websiteId, page);
            if (success){
                vm.message = "Successfully created the page";
                init();
            } else{
                vm.error = "Failed to add the page, try again!!!";
            }
        }
    }
})();