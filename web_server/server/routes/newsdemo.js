var express = require('express');
var rpcClient = require('../rpc_client/rpc_client');
var router = express.Router();

router.get('/', function(req, res) {
    console.log('Fetching demo news...');
    rpcClient.searchNews( '', 1 , function(response) {
        res.json(response);
    });
});

module.exports = router;
