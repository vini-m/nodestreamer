var express = require('express'),
    fs = require('fs'),
    request = require('request');
var router = express.Router();

// Error handlers
var handles404 = function (req, res) {
    res.status(404);
    res.render('404', {url:req.url});
};

// Callbacks
var episodesCallback = function (req, res) {
    var { episodeCode } = req.params;
    //var yp_code = `YP-1R-${episodeCode}.mkv`;
    //var yp_url = 'https://yp.coco-pommel.org/ypvideo/' + yp_code;
    var ys_code = `YP-SV-1R-${episodeCode}.mkv`;
    var yp_url = 'https://yp.coco-pommel.org/ypstar/' + ys_code; 
    request(yp_url).pipe(res);
};

// Routes
router.get('/');
router.get('/episodes/:episodeCode', episodesCallback);
router.use(handles404);

module.exports = router;
