const { Kafka } = require('kafkajs');

 exports.kafka = new Kafka({
    brokers: ['192.168.1.3:9092']
});
