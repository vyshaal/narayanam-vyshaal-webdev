/**
 * Created by vyshaalnarayanam on 3/2/17.
 */

module.exports = function (app) {
    app.post('/api/website/:websiteId/page', createPage);
    app.get('/api/website/:websiteId/page', findPageByWebsiteId);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);

    var count = 1000;
    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem", "updated": new Date(), "developerId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem", "updated": new Date(), "developerId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem", "updated": new Date(), "developerId": "456" }
    ];

    // TODO: website crud functions

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        for(var p in pages) {
            if(pageId == pages[p]._id) {
                pages.splice(p,1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var page = req.body;
        for(var p in pages) {
            if(pageId == pages[p]._id) {
                pages[p].name = page.name;
                pages[p].description = page.description;
                pages[p].updated = new Date();
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page = req.body;
        count++;
        page._id = count.toString();
        page.websiteId = websiteId;
        pages.push(page);
        res.json(page);
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        for(var p in pages) {
            if(pageId == pages[p]._id) {
                res.json(pages[p]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function findPageByWebsiteId(req, res) {
        var websiteId = req.params.websiteId;
        var pgs = [];
        for(var p in pages) {
            if(websiteId == pages[p].websiteId) {
                pgs.push(pages[p]);
            }
        }
        res.json(pgs);
    }
};