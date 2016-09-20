var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

router.post('/api/v1/createInterview', function(req, res, next) {
    try {
        var reqObj = req.body;
        console.log(reqObj);
        req.getConnection(function(err, conn) {
            if (err) {
                console.error('SQL Connection Error: ', err);
                return next(err);
            }
            else {
                var insertSql = "INSERT INTO interviews SET ?";
                var insertValues = {
                    "title" : reqObj.Interview_Title,
                    "notes" : reqObj.Interview_Notes
                };

                var query = conn.query(insertSql, insertValues, function(err, result) {
                    if (err) {
                        console.error('SQL Error: ', err);
                        return next(err);
                    }
                    console.log(result);
                    var InterviewId = result.insertId;
                    res.json({"InterviewId":InterviewId});
                });
            }
        });
    }
    catch(ex) {
        console.error('Internal Error: ' + ex);
        return next(ex);
    }
});

router.get('/api/v1/getInterview', function(req, res, next) {
    try {
        var interviewId = req.param('interviewId');
        //var query = req.url.parse(req.url, true).query;
        //console.log(query);
        //var interviewId = query.InterviewId;
        console.log(interviewId);
        req.getConnection(function(err, conn) {
            if (err) {
                console.error('SQL Connection error: ', err);
                return next(err);
            }
            else {
                conn.query('SELECT title, notes FROM Interviews WHERE id = ?', [interviewId], function(err, rows, fields) {
                    if (err) {
                        console.error('SQL Error: ', err);
                        return next(err);
                    }
                    var resInterview = [];
                    for (var interviewIndex in rows) {
                        var interviewObj = rows[interviewIndex];
                        resInterview.push(interviewObj);
                    }
                    res.json(resInterview);
                });
            }
        });
    }
    catch(ex) {
        console.error("Internal error: ", ex);
        return next(ex);
    }
});
