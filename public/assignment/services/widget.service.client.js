/**
 * Created by vyshaalnarayanam on 2/16/17.
 */

(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {

        var api = {
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "createWidget": createWidget,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        };
        return api;

        function deleteWidget(widgetId) {
            return $http.delete('/api/widget/'+widgetId);
        }

        function updateWidget(widgetId, widget) {
            return $http.put('/api/widget/'+widgetId, widget);
        }

        function findWidgetById(wgid) {
            return $http.get('/api/widget/'+wgid);
        }

        function findWidgetsByPageId(pageId) {
            return $http.get('/api/page/'+pageId+'/widget');
        }

        function createWidget(pageId, widget) {
            return $http.post('/api/page/'+pageId+'/widget',widget);
        }

    }
})();