var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

//**** BEGIN CUSTOMER SECTION ****//
// CREATE CUSTOMER
// CREATE INTERVIEW
router.post('/api/v1/createCustomer', function(req, res, next) {
    try {
        var reqObj = req.body;
        console.log('Customer Object: ' + reqObj);
        req.getConnection(function(err, conn) {
            if (err) {
                console.error('SQL Connection Error: ', err);
                return next(err);
            }
            else {
                var insertSql = "INSERT INTO customers SET ?";
                var insertValues = {
                    "first_name" : reqObj.first_name,
                    "last_name" : reqObj.last_name,
                    "email" : reqObj.email,
                    "image_link" : reqObj.image_link,
                    "create_user" : reqObj.create_user,
                    "update_user" : reqObj.create_user
                };

                var query = conn.query(insertSql, insertValues, function(err, result) {
                    if (err) {
                        console.error('SQL Error: ', err);
                        return next(err);
                    }
                    console.log('Customer Table Insert Result: ' + result);
                    var CustomerId = result.insertId;
                    res.json({"CustomerId":CustomerId});
                });
            }
        });
    }
    catch(ex) {
        console.error('Internal Error: ' + ex);
        return next(ex);
    }
});

// CREATE INTERVIEW CUSTOMER ASSOCIATION
router.post('/api/v1/createInterviewCustomer', function(req, res, next) {
    try {
        var reqObj = req.body;
        console.log(reqObj);
        req.getConnection(function(err, conn) {
            if (err) {
                console.error('SQL Connection Error: ', err);
                return next(err);
            }
            else {
                var insertSql = "INSERT INTO interview_customer SET ?";
                var insertValues = {
                    "interview_id" : reqObj.interview_id,
                    "customer_id" : reqObj.customer_id,
                    "create_user" : reqObj.create_user,
                    "update_user" : reqObj.create_user
                };

                var query = conn.query(insertSql, insertValues, function(err, result) {
                    if (err) {
                        console.error('SQL Error: ', err);
                        return next(err);
                    }
                    console.log(result);
                    var InterviewCustomerId = result.insertId;
                    res.json({"InterviewCustomerId":InterviewCustomerId});
                });
            }
        });
    }
    catch(ex) {
        console.error('Internal Error: ' + ex);
        return next(ex);
    }
});
//**** END INTERVIEW SECTION ****//
