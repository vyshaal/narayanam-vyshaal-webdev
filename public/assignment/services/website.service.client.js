/**
 * Created by vyshaalnarayanam on 2/16/17.
 */

(function () {
    angular
        .module("WebAppMaker")
        .service("WebsiteService", WebsiteService);

    function WebsiteService() {
        count = 10000;
        var websites = [
            { "_id": "123", "name": "Facebook",     "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",      "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",      "developerId": "456", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe",  "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",     "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",        "developerId": "234", "description": "Lorem" }
        ];
        // TODO: complete website crud functions
        this.createWebsite = createWebsite;
        this.findWebsitesByUser = findWebsitesByUser;
        this.findWebsiteById = findWebsiteById;
        this.updateWebsite = updateWebsite;
        this.deleteWebsite = deleteWebsite;

        function deleteWebsite(websiteId) {
            for(var w in websites) {
                if(websiteId === websites[w]._id) {
                    websites.splice(w,1);
                    return true;
                }
            }
            return false;
        }

        function updateWebsite(websiteId, website) {
            for(var w in websites) {
                if(websiteId === websites[w]._id) {
                    websites[w].name = website.name;
                    websites[w].description = website.description;
                    return websites[w];
                }
            }
            return null;
        }

        function createWebsite(userId, website) {
            website._id = ++count;
            website.developerId = userId;
            websites.push(website);
            console.log(website);
            return website;
        }

        function findWebsiteById(websiteId) {
            for(var w in websites) {
                if(websiteId === websites[w]._id) {
                    return angular.copy(websites[w]);
                }
            }
            return null;
        }

        function findWebsitesByUser(userId) {
            var site = [];
            for(var w in websites) {
                if(userId === websites[w].developerId) {
                    site.push(websites[w]);
                }
            }
            return site;
        }
    }
})();