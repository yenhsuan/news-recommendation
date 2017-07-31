# -*- coding: utf-8 -*- 
import re
import numpy as np
import pandas as pd
import pickle
import pyjsonrpc
import sys
import time
from sklearn.naive_bayes import MultinomialNB
from sklearn.svm import LinearSVC
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.preprocessing import LabelEncoder
import cPickle as pickle


SERVER_HOST = 'localhost'
SERVER_PORT = 6060
NEWS_CLASSES = {'m':'Health', 'b': 'Business', 't': 'Techonology', 'e': 'Entertainment'};

#News category (b = business, t = science and technology, e = entertainment, m = health)

svm = pickle.load( open( "news-svm.model", "rb" ) )
vectorizer = pickle.load( open( "news-vectorizer.model", "rb" ) )
encoder = pickle.load( open( "news-encoder.model", "rb" ) )


def normalize_text(s):
    s = s.decode("utf8")
    s = s.lower()
    # remove punctuation that is not word-internal (e.g., hyphens, apostrophes)
    s = re.sub('\s\W',' ',s)
    s = re.sub('\W\s',' ',s)
    
    # make sure we didn't introduce any double spaces
    s = re.sub('\s+',' ',s)
    
    return s

class RequestHandler(pyjsonrpc.HttpRequestHandler):
    @pyjsonrpc.rpcmethod
    def classify(self, text):
        print text
        newsTitle = vectorizer.transform([normalize_text(text).decode("utf8")])
        topicClassIndex = encoder.inverse_transform(svm.predict(newsTitle))[0]   
        
        topic = NEWS_CLASSES[topicClassIndex]

        return topic


# Threading HTTP-Server
http_server = pyjsonrpc.ThreadingHttpServer(
    server_address = (SERVER_HOST, SERVER_PORT),
    RequestHandlerClass = RequestHandler
)

print "Starting predicting server ..."
print "URL: http://" + str(SERVER_HOST) + ":" + str(SERVER_PORT)

http_server.serve_forever()
