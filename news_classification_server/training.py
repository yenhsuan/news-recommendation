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


# grab the data
news = pd.read_csv("newsCorpora.csv",encoding='utf8', sep='\t', names=['ID','TITLE','URL','PUBLISHER','CATEGORY','STORY','HOSTNAME','TIMESTAMP'])

print news.keys()
def normalize_text(s):
    s = s.lower()
    
    # remove punctuation that is not word-internal (e.g., hyphens, apostrophes)
    s = re.sub('\s\W',' ',s)
    s = re.sub('\W\s',' ',s)
    
    # make sure we didn't introduce any double spaces
    s = re.sub('\s+',' ',s)
    
    return s

news['TEXT'] = [normalize_text(s) for s in news['TITLE']]

# pull the data into vectors
vectorizer = CountVectorizer()
x = vectorizer.fit_transform(news['TEXT'])

encoder = LabelEncoder()
y = encoder.fit_transform(news['CATEGORY'])

# split into train and test sets
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.01)

# take a look at the shape of each of these
print(x_train.shape)
print(y_train.shape)
print(x_test.shape)
print(y_test.shape)

nb = LinearSVC()
nb.fit(x_train, y_train)

# Save training results

file = open('news-svm.model','wb')
pickle.dump(nb,file)
file.close()

file = open('news-vectorizer.model','wb')
pickle.dump(vectorizer,file)
file.close()

file = open('news-encoder.model','wb')
pickle.dump(encoder,file)
file.close()


print nb.score(x_test, y_test)


a = 'ISIS war in mid asia'
aa = vectorizer.transform([normalize_text(a).decode("utf8")])
print nb.predict(aa)


print encoder.inverse_transform(nb.predict(aa))[0]   
