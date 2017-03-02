/**
 * Created by vyshaalnarayanam on 2/16/17.
 */

(function () {
    angular
        .module("WebAppMaker")
        .service("WebsiteService", WebsiteService);

    function WebsiteService($http) {

        this.createWebsite = createWebsite;
        this.findWebsitesByUser = findWebsitesByUser;
        this.findWebsiteById = findWebsiteById;
        this.updateWebsite = updateWebsite;
        this.deleteWebsite = deleteWebsite;

        function deleteWebsite(websiteId) {
            return $http.delete('/api/website/'+websiteId);
        }

        function updateWebsite(websiteId, website) {
            return $http.put('/api/website/'+websiteId, website);
        }

        function createWebsite(userId, website) {
            return $http.post('/api/user/'+userId+"/website", website);
        }

        function findWebsiteById(websiteId) {
            return $http.get('/api/website/'+websiteId);
        }

        function findWebsitesByUser(userId) {
            //console.log("sending request to server...");
            return $http.get('/api/user/'+userId+"/website");
        }
    }
})();