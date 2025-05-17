import { PrismaClient } from "@prisma/client";
import kafka from "../kafka.js";
import { emitComment } from "../socketHandler.js";

const prisma = new PrismaClient();
const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "user-group" });

const postComment = async (req, res) => {
  const { comment } = req.body;

  // kafka producer
  await producer.connect();

  await producer.send({
    topic: "streamer-comments",
    messages: [{ value: comment }],
  });

  await producer.disconnect();

  return res.status(201).json();
};

const getComments = async (req, res) => {
  const result = await prisma.comment.findMany();
  return res.status(200).json(result);
};

// kafka consumer
(async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "streamer-comments" });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const comment = message.value.toString();
      console.log("Consuming ->", comment);

      const savedComment = await prisma.comment.create({
        data: {
          comment: comment,
        },
      });

      emitComment(savedComment);
    },
  });
})();

export { postComment, getComments };
