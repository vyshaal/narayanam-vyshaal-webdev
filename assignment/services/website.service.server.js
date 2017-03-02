/**
 * Created by vyshaalnarayanam on 3/2/17.
 */

module.exports = function (app) {
    app.post('/api/user/:userId/website', createWebsite);
    app.get('/api/user/:userId/website', findWebsitesByUser);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);


    var count = 1000; // website ids
    var websites = [
        { "_id": "123", "name": "Facebook", update: new Date(),    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter", update: new Date(),     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo", update: new Date(),     "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", update: new Date(), "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers", update: new Date(),    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess", update: new Date(),       "developerId": "234", "description": "Lorem" }
    ];

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        for(var w in websites) {
            if(websiteId == websites[w]._id) {
                websites.splice(w,1);
                res.sendStatus(200)
                return;
            }
        }
        res.sendStatus(404);
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var website = req.body;
        for(var w in websites) {
            if(websiteId == websites[w]._id) {
                websites[w].name = website.name;
                websites[w].update = new Date();
                websites[w].description = website.description;
                res.json(websites[w]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function createWebsite(req, res) {
        var userId = req.params.userId;
        var website = req.body;
        ++count;
        website._id = count.toString();
        website.developerId = userId;
        website.update = new Date();
        websites.push(website);
        //console.log(website);
        res.json(website);
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        //console.log(websiteId);
        for(var w in websites) {
            if(websiteId == websites[w]._id) {
                //console.log(websites[w]);
                res.json(websites[w]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function findWebsitesByUser(req, res) {
        var userId = req.params.userId;
        var sites = [];
        for(var w in websites) {
            if(userId === websites[w].developerId) {
                sites.push(websites[w]);
            }
        }
        //console.log(sites);
        res.json(sites);
    }
};