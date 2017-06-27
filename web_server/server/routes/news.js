var express = require('express');
var rpc_client = require('../rpc_client/rpc_client');
var router = express.Router();

/* GET news list. */
router.get('/userId/:userId/pageNum/:pageNum', function(req, res) {
 console.log('Fetching news...');
 let user_id = req.params['userId'];
 let page_num = req.params['pageNum'];

 rpc_client.getNewsSummariesForUser(user_id, page_num, function(response) {
   res.json(response);
 });
});

/* Log news click. */
router.post('/userId/:userId/newsId/:newsId', function(req,res) {
  console.log('Logging news click...');
  let user_id = req.params['userId'];
  let news_id = req.params['newsId'];

  rpc_client.logNewsClickForUser(user_id, news_id);
  res.status(200);
});


router.post('/search', function(req,res) {
  console.log('Searching news...');
   let keyword = req.body['keyword'];
   let page_num = req.body['pageNum'];
   rpc_client.searchNews( keyword, page_num , function(response) {
   res.json(response);
  });
});


module.exports = router;
