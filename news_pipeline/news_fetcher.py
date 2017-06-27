import os
import sys

from newspaper import Article

# import common package in parent directory
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))
sys.path.append(os.path.join(os.path.dirname(__file__), 'scrapers'))

import cnn_news_scraper
from cloudAMQP_client import CloudAMQPClient

SLEEP_TIME_IN_SECONDS = 5

# TODO: use your own queue.
DEDUPE_NEWS_TASK_QUEUE_URL = "amqp://khdhvdew:_mEIqE-mBr79sU4jX_EMMbFz7RqmLjzq@donkey.rmq.cloudamqp.com/khdhvdew"
DEDUPE_NEWS_TASK_QUEUE_NAME = "news-pipeline-dedupe"
SCRAPE_NEWS_TASK_QUEUE_URL = "amqp://fwwriyrb:28ajY74iNKQJ7QAd6FFURzRMwlB3T5d_@donkey.rmq.cloudamqp.com/fwwriyrb"
SCRAPE_NEWS_TASK_QUEUE_NAME = "news-pipeline"

scrape_news_queue_client = CloudAMQPClient(SCRAPE_NEWS_TASK_QUEUE_URL, SCRAPE_NEWS_TASK_QUEUE_NAME)
dedupe_news_queue_client = CloudAMQPClient(DEDUPE_NEWS_TASK_QUEUE_URL, DEDUPE_NEWS_TASK_QUEUE_NAME)

def handle_message(msg):
    if msg is None or not isinstance(msg, dict):
        print 'message is broken'
        return

    task = msg
    text = None

    article = Article(task['url'])
    article.download()
    article.parse()

    task['text'] = article.text

    dedupe_news_queue_client.sendMessage(task)


while True:
    if scrape_news_queue_client is not None:
        msg = scrape_news_queue_client.getMessage()
        if msg is not None:
            # Parse and process the task
            try:
                handle_message(msg)
            except Exception as e:
                print e
                pass
        scrape_news_queue_client.sleep(SLEEP_TIME_IN_SECONDS)
