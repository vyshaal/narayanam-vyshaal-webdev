/**
 * Created by vyshaalnarayanam on 2/16/17.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var vm = this;

        function init() {
            vm.websiteId = websiteId;
            vm.userId = userId;

            vm.pages = PageService.findPageByWebsiteId(websiteId);
        }
        init();
    }
})();