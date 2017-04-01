module.exports = function (app, model) {

    app.post('/api/page/:pageId/widget', createWidget);
    app.get('/api/page/:pageId/widget', findWidgetsByPageId);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);
    app.put('/api/page/:pageId/widget', sortWidgets);

    var widgetModel = model.widgetModel;
    var pageModel = model.pageModel;

    var multer = require('multer'); // npm install multer --save
    var upload = multer({
        dest: __dirname+'/../../public/uploads'
    });

    app.post ("/api/upload", upload.single('myFile'), uploadImage);

    function uploadImage(req, res) {

        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var userId        = req.body.userId;
        var pageId        = req.body.pageId;
        var websiteId      = req.body.websiteId;
        var myFile        = req.file;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        widget = getWidgetById(widgetId);
        console.log(widgetId);
        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                widget.url = '/uploads/'+filename;
                //console.log(widget);

                return widgetModel
                    .updateWidget(widgetId, widget);
            })
            .then(function (widget) {
                var callbackUrl   = "/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;
                //res.sendStatus(204);
                res.redirect(callbackUrl);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .deleteWidget(widgetId)
            .then(function (status) {
                return pageModel.removeWidget(widgetId);
            })
            .then(function (status) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            });

    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        if (widget.width)
            widget.width = widget.width+"%";
        widgetModel
            .updateWidget(widgetId, widget)
            .then(function (status) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            });

    }

    function getWidgetById(widgetId) {
        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                //console.log(widget);
                return widget;
            }, function (err) {
                //console.log(err);
                return null;
            });
    }

    function findWidgetById(req, res) {
        var wgid = req.params.widgetId;
        widgetModel
            .findWidgetById(wgid)
            .then(function (widget) {
                res.json(widget);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findWidgetsByPageId(req, res) {
        var pageId = req.params.pageId;
        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                //console.log(widgets);
                res.json(widgets);
            }, function (err) {
                res.sendStatus(500).send(err);
            });

    }

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;
        //console.log(widget);
        widgetModel
            .createWidget(pageId, widget)
            .then(function (widget) {
                return pageModel.addWidget(pageId, widget._id);
            })
            .then(function (widgetId) {
                //console.log(widgetId);
                widget._id = widgetId;
                //console.log(widget);
                res.send(widget);
            }, function (err) {
                res.sendStatus(500).send(err);
            });

    }

    function sortWidgets(req, res) {
        var start = req.query.initial;
        var end = req.query.final;
        var pageId = req.params.pageId;
        //console.log([start, end, pageId]);

        pageModel
            .reorderWidget(pageId, start, end)
            .then(function (page) {
                //console.log(page);
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

};