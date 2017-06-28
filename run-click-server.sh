#!/bin/bash
service redis_6379 start

pip install -r requirements.txt

cd news_topic_modeling_service/server
python server.py &

cd ../../news_recommendation_service
python click_log_processor.py &

echo "=================================================="
read -p "PRESS [ENTER] TO TERMINATE PROCESSES." PRESSKEY

kill $(jobs -p)