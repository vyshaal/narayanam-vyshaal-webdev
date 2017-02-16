/**
 * Created by vyshaalnarayanam on 2/16/17.
 */

(function () {
    angular
        .module("WebAppMaker")
        .service("PageService", PageService);

    function PageService() {
        var count = 10000;
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem", "updated": new Date(), "developerId": "456" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem", "updated": new Date(), "developerId": "456" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem", "updated": new Date(), "developerId": "456" }
        ];

        var api = {
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            createPage: createPage,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        function deletePage(pageId) {
            for(var p in pages) {
                if(pageId === pages[p]._id) {
                    pages.splice(p,1);
                    return true;
                }
            }
            return false;
        }
        function updatePage(pageId, page) {
            for(var p in pages) {
                if(pageId === pages[p]._id) {
                    pages[p].name = page.name;
                    pages[p].description = page.description;
                    pages[p].updated = new Date();
                    return true;
                }
            }
            return false;
        }
        function createPage(websiteId, page) {
            page._id = ++count;
            page.websiteId = websiteId;
            pages.push(page);
            return page;
        }

        function findPageById(pageId) {
            for(var p in pages) {
                if(pageId === pages[p]._id) {
                    return angular.copy(pages[p]);
                }
            }
            return null;
        }

        function findPageByWebsiteId(websiteId) {
            var ps = [];
            for(var p in pages) {
                if(websiteId === pages[p].websiteId) {
                    ps.push(pages[p]);
                }
            }
            return ps;
        }
    }
})();