# Kafka-restapi

Nodejs implementation for producing, consuming messages, and getting topic related details from kafka

# Installation:

npm install

- Add a .env file with all required details i.e.
  BROKER, USERNAME, and PASSWORD are required variable. PORT is optional variable that can be added or 6060 will be default port

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

Sample response:

```
{
    "data": {
        "topic": "learning",
        "partition": 3,
        "offset": "1"
    }
}
```

Key value is auto generated uuid

2. API to get offset data
   GET http://localhost:6060/topics/learning/offsets

3. API to get list of topics
   GET http://localhost:6060/topics

4. consumer implementation is within the code and starts automatically. You can see the new published messages showing up in console
