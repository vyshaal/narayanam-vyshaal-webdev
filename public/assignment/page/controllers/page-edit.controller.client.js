/**
 * Created by vyshaalnarayanam on 2/16/17.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, PageService, $location) {
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;
        var vm = this;

        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            vm.pageId = pageId;
            vm.websiteId = websiteId;
            vm.userId = userId;

            vm.pages = PageService.findPageByWebsiteId(websiteId);
            vm.page = PageService.findPageById(pageId);
        }
        init();

        function deletePage() {
            var success = PageService.deletePage(pageId);
            if (success){
                $location.url('/user/'+userId+'/website/'+websiteId+'/page');
            } else {
                vm.error = "Failed to delete the page, try again!!!";
            }
        }

        function updatePage(page) {
            var success = PageService.updatePage(pageId, page);
            if (success){
                vm.message = "Successfully update the page";
            } else{
                vm.error = "Failed to update the page, try again!!!";
            }
        }
    }
})();