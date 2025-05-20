import kafka from "../kafka.js";
import { emitComment } from "../socketHandler.js";
import connectDB from "../db/db.js";
import Comment from "../model/Comment.js";

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "user-group" });

await connectDB();

const postComment = async (req, res) => {
  const { comment } = req.body;

  const message = {
    comment,
    userId: req.userId,
    userName: req.userName,
  };

  // kafka producer
  await producer.connect();

  await producer.send({
    topic: "streamer-comments",
    messages: [{ value: JSON.stringify(message) }],
  });

  await producer.disconnect();

  return res.status(201).json();
};

const getComments = async (req, res) => {
  const beforeId = req.query?.beforeId;

  let comments;
  if (beforeId) {
    comments = await Comment.find({
      _id: { $lt: beforeId },
    })
      .sort({ _id: -1 })
      .limit(20);
  } else {
    comments = comments = await Comment.find().sort({ _id: -1 }).limit(10);
  }
  return res.status(200).json(comments);
};

// kafka consumer
(async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "streamer-comments" });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const data = JSON.parse(message.value.toString());
      console.log("Consuming ->", data);

      const savedComment = await Comment.create({
        comment: data.comment,
        userId: data.userId,
        userName: data.userName,
      });

      emitComment(savedComment);
    },
  });
})();

export { postComment, getComments };
