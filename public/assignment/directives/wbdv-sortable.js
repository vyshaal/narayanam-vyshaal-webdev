/**
 * Created by vyshaalnarayanam on 3/2/17.
 */

(function () {
    angular
        .module('wbdvDirectives', [])
        .directive('sortable', sortableDir);

    function sortableDir() {
        //console.log("Sortable Dir");
        function linkFunc(scope, element) {
            var startIndex = -1;
            var stopIndex = -1;
            element
                .sortable({
                    axis: 'y',
                    handle: ".glyphicon-align-justify",
                    start: function (event, ui) {
                        startIndex = ui.item.index();
                    },
                    stop: function (event, ui) {
                        stopIndex = ui.item.index();
                        console.log([startIndex, stopIndex]);
                    }
                })
                .disableSelection();
        }
        return {
            link: linkFunc
        };
    }
})();