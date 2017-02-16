/**
 * Created by vyshaalnarayanam on 2/16/17.
 */

(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var count = 10000;
        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
        ];

        var api = {
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "createWidget": createWidget,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        };
        return api;

        function deleteWidget(widgetId) {
            for(w in widgets){
                if (widgets[w]._id == widgetId) {
                    widgets.splice(w,1);
                    return true;
                }
            }
            return false;
        }

        function updateWidget(widgetId, widget) {
            for(w in widgets){
                if (widgets[w]._id == widgetId) {
                    widgets[w].name = widget.name;
                    widgets[w].size = widget.size;
                    widgets[w].text = widget.text;
                    widgets[w].width = widget.width;
                    widgets[w].url = widget.url;
                    return widgets[w];
                }
            }
            return null;
        }

        function findWidgetById(widgetId) {
            for(var p in widgets){
                if(widgets[p]._id == widgetId)
                    return widgets[p];
            }
            return null;
        }

        function findWidgetsByPageId(pageId) {
            var wdgs = [];
            for(w in widgets){
                if (widgets[w].pageId == pageId)
                    wdgs.push(widgets[w]);
            }
            return wdgs;
        }

        function createWidget(pageId, widget) {
            widget._id = ++count;
            widget.pageId = pageId;
            widgets.push(widget);
            return widget;
        }


    }
})();