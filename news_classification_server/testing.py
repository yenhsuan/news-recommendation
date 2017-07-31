# -*- coding: utf-8 -*- 
# get some libraries that will be useful
import re
import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)

# the Naive Bayes model
from sklearn.naive_bayes import MultinomialNB
from sklearn.svm import LinearSVC

# function to split the data for cross-validation
from sklearn.model_selection import train_test_split
# function for transforming documents into counts
from sklearn.feature_extraction.text import CountVectorizer
# function for encoding categories
from sklearn.preprocessing import LabelEncoder
import cPickle as pickle

def normalize_text(s):
    s = s.lower()
    
    # remove punctuation that is not word-internal (e.g., hyphens, apostrophes)
    s = re.sub('\s\W',' ',s)
    s = re.sub('\W\s',' ',s)
    
    # make sure we didn't introduce any double spaces
    s = re.sub('\s+',' ',s)
    
    return s

nb = pickle.load( open( "news-svm.model", "rb" ) )
vectorizer = pickle.load( open( "news-vectorizer.model", "rb" ) )
encoder = pickle.load( open( "news-encoder.model", "rb" ) )

a = 'new PS4 in 2017 Summer'
aa = vectorizer.transform([a.decode("utf8")])
print nb.predict(aa)


print encoder.inverse_transform(nb.predict(aa))[0]   
