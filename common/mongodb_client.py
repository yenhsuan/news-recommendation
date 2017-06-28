from pymongo import MongoClient

#MONGO_DB_HOST = 'localhost'
#MONGO_DB_PORT = '27017'
#DB_NAME = 'tap-news'

MONGO_DB_HOST = '[ds143340.mlab.com]'
MONGO_DB_PORT = '43340'
DB_NAME = 'tapnews'


#mongodb://<dbuser>:<dbpassword>@ds143340.mlab.com:43340/tapnews

client = MongoClient("%s:%s" % (MONGO_DB_HOST, MONGO_DB_PORT))

def get_db(db=DB_NAME):
    db = client[db]
    db.authenticate('terry', '5566')
    db.news.create_index('createdAt', expireAfterSeconds=1728000);
    return db
