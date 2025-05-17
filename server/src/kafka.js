import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "steamer-app",
  brokers: [process.env.KAFKA_BROKER_URL],
});

export default kafka;
