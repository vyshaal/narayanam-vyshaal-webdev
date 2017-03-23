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

            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .success(function (widgets) {
                    vm.widgets = widgets;
                });
        }
        init();

        vm.addWidget = addWidget;

        function addWidget(widgetType) {
            var widget = {};
            widget.widgetType = widgetType;
            widget.deletable = true;
            var promise = WidgetService.createWidget(vm.pageId, widget);
            promise.success(function (widget) {
                $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/'+widget._id);
            });
        }
    }
})();