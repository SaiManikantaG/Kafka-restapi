# Kafka-restapi

Nodejs implementation for producing, consuming messages, and getting topic related details from kafka

# Installation:

npm install

# Starting the app

npm run start

## Usage

APIs

1. API for Producing messages to kafka
   POST: http://localhost:<<PORT_NUMBER>>/topics

Sample body:

```
{
"topic": "learning",
"message": {
"version": "1.0",
"name": "developer",
"author": "developer-friendly"
}
}
```

- topic is mandatory field

2. API to get offset data
   GET http://localhost:6060/topics/learning/offsets

3. API to get list of topics
   GET http://localhost:6060/topics
