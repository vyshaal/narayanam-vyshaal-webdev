/**
 * Created by vyshaalnarayanam on 3/2/17.
 */

module.exports = function (app, model) {
    app.post('/api/website/:websiteId/page', createPage);
    app.get('/api/website/:websiteId/page', findPageByWebsiteId);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);

    var websiteModel = model.websiteModel;
    var pageModel = model.pageModel;
    var userModel = model.userModel;

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        pageModel
            .deletePage(pageId)
            .then(function (status) {
                return websiteModel.removePage(pageId);
            })
            .then(function (status) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var page = req.body;

        pageModel
            .updatePage(pageId, page)
            .then(function (status) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page = req.body;

        pageModel
            .createPage(websiteId, page)
            .then(function (page) {
                return websiteModel.addPage(websiteId, page._id);
            })
            .then(function (doc) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        pageModel
            .findPageById(pageId)
            .then(function (page) {
                res.json(page);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findPageByWebsiteId(req, res) {
        var websiteId = req.params.websiteId;
        var pagesFetched;
        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(function (pages) {
                pagesFetched = pages;
                //return userModel.findUserById(pages)
                res.json(pages);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
};