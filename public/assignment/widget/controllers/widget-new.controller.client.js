/**
 * Created by vyshaalnarayanam on 2/16/17.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

    function WidgetNewController($location, $routeParams, WidgetService) {
        var vm = this;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pageId = $routeParams.pid;

            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        }
        init();

        vm.addWidget = addWidget;

        function addWidget(widgetType) {
            var widget = {};
            widget.widgetType = widgetType;
            console.log('Adding Widget'+widgetType);
            var id = WidgetService.createWidget(vm.pageId, widget)._id;
            $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/'+id);
        }
    }
})();