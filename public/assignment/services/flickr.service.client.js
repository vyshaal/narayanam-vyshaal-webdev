/**
 * Created by vyshaalnarayanam on 4/1/17.
 */

(function () {
    //console.log("Service loaded");
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    function FlickrService($http) {

        var key = "51f0aa4aabd716773e193f0963f96eab";
        var secret = "7a4bd2a6c89831f1";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        //console.log(urlBase);
        var api = {
            "searchPhotos": searchPhotos
        };
        return api;
        function searchPhotos(searchTerm) {
            //console.log(urlBase);
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }


    }
})();