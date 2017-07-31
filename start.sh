#!/bin/bash
service redis_6379 start

pip install -r requirements.txt

cd ./news_recommendation_service
python click_log_processor.py &
python recommendation_service.py &

cd ../backend_server
python service.py &
