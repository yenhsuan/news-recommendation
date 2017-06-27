// Set up RPC-Server
let jayson = require('jayson');
let nodeRpcClient = jayson.client.http({
    hostname: 'localhost',
    port: 4040
});


// Get news infomation from backend server
function getNewsSummariesForUser(userId, pageNum, callback) {
    nodeRpcClient.request(
        'getNewsSummariesForUser', [userId, pageNum], (err,error, response) => {
            if (err) {
                throw err;
            }

            console.log('[+] News received:');
            console.log(response);
            callback(response);
        }
    );
}

// Send user click-behaviors to backend server
function logNewsClickForUser(userId, newsId) {
    nodeRpcClient.request(
        'logNewsClickForUser', [userId, newsId], (err,error, response) => {
            if (err) {
                throw err;
            }

            console.log('[v] User-clicks sent:');
            console.log(response);
        }
    );
}


// Search news
function searchNews(keyword, page_num, callback) {
    nodeRpcClient.request(
        'searchNews', [keyword, page_num], (err,error, response) => {
            if (err) {
                throw err;
            }

            console.log('[+] Search results received:');
            console.log(response);
            callback(response);
        }
    );
}



module.exports = {
    getNewsSummariesForUser: getNewsSummariesForUser,
    logNewsClickForUser: logNewsClickForUser,
    searchNews:searchNews
};
