import { Admin, Consumer, Kafka, Producer, RecordMetadata } from "kafkajs";
import { v4 as uuid } from "uuid";
require("dotenv").config();

interface IMessageData {
  topic: string;
  partition: number;
  offset: string | undefined;
}

export class KafkaClient {
  constructor() {}

  public async client(): Promise<Kafka> {
    // Create the client with the broker list
    const kafka: Kafka = new Kafka({
      clientId: "dev-kafka-rest",
      brokers: [process.env.BROKER as string],
      // authenticationTimeout: 10000,
      // reauthenticationThreshold: 10000,
      ssl: true,
      sasl: {
        mechanism: "plain", // scram-sha-256 or scram-sha-512
        username: process.env.USERNAME as string,
        password: process.env.PASSWORD as string,
      },
    });
    return kafka;
  }

  public async admin(): Promise<Admin> {
    const client: Kafka = await this.client();
    const admin: Admin = client.admin();

    // remember to connect and disconnect when you are done
    await admin.connect();
    return admin;
  }

  public async listTopics(): Promise<string[]> {
    const admin = await this.admin();
    return admin.listTopics();
  }

  public async topicOffsets(topic: string) {
    const admin = await this.admin();
    return admin.fetchTopicOffsets(topic);
  }

  public async produce(topic: string, message: any): Promise<IMessageData> {
    const client: Kafka = await this.client();
    const producer: Producer = await client.producer({
      allowAutoTopicCreation: false,
      transactionTimeout: 30000,
    });
    await producer.connect();
    const details: RecordMetadata[] = await producer.send({
      topic,
      messages: [
        {
          key: uuid(),
          value: Buffer.from(JSON.stringify(message), "utf-8"),
        },
      ],
    });
    const data: IMessageData = {
      topic,
      partition: details[0].partition,
      offset: details[0].baseOffset,
    };
    return data;
  }

  public async consume(topic: string) {
    try {
      const client: Kafka = await this.client();
      const consumer: Consumer = await client.consumer({
        groupId: "kafka-restapi",
      });
      await consumer.connect();
      await consumer.subscribe({
        topics: [topic],
        fromBeginning: true,
      });
      await consumer.run({
        eachMessage: async ({
          topic,
          partition,
          message,
          heartbeat,
          pause,
        }) => {
          console.log({
            key: message.key?.toString(),
            value: message.value?.toString(),
            headers: message.headers,
            offset: message.offset,
            partition,
            topic,
          });
        },
      });
    } catch (error) {
      console.log("Error with consumer", error);
    }
  }
}
