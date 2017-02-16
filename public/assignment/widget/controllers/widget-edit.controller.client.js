/**
 * Created by vyshaalnarayanam on 2/16/17.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($sce, $routeParams, WidgetService, $location) {
        var vm = this;

        vm.doYouTrustUrl = doYouTrustUrl;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.wgId = $routeParams.wgid;

        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
            vm.widget = WidgetService.findWidgetById(vm.wgId);
        }
        init();

        vm.deleteWidget = deleteWidget;
        vm.updateWidget = updateWidget;

        function doYouTrustUrl(url) {
            var baseUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split('/');
            var id = urlParts[urlParts.length - 1];
            baseUrl += id;
            return $sce.trustAsResourceUrl(baseUrl);
        }

        function deleteWidget() {
            var success = WidgetService.deleteWidget(vm.wgId);
            if(success){
                $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget');
            } else{
                vm.error = "Failed to delete the widget, try again!!!";
            }
        }

        function updateWidget(){
            var success = WidgetService.updateWidget(vm.wgId, vm.widget);
            if (success){
                vm.message = "Successfully updated the widget";
            } else{
                vm.error = "Failed to update the widget, try again!!!";
            }
        }
    }
})();