import kafka from "../kafka.js";
import { emitComment } from "../socketHandler.js";
import connectDB from "../db/db.js";
import Comment from "../model/Comment.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import Stream from "../model/Stream.js";

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "user-group" });

await connectDB();

const postComment = asyncHandler(async (req, res) => {
  const { streamId } = req.params;

  if (!streamId) {
    throw new ApiError(400, "StreamId is required");
  }

  const stream = await Stream.findById(streamId);

  if (!stream) {
    throw new ApiError(404, "Stream not found");
  }

  const { comment } = req.body;

  if (!comment || comment.trim() === "") {
    throw new ApiError(400, "Comment is required");
  }

  const message = {
    comment,
    userId: req.userId,
    userName: req.userName,
    streamId,
  };

  // kafka producer
  await producer.connect();

  await producer.send({
    topic: "streamer-comments",
    messages: [{ value: JSON.stringify(message) }],
  });

  await producer.disconnect();

  return res
    .status(201)
    .json(new ApiResponse(201, {}, "Comment posted successfully"));
});

const getComments = asyncHandler(async (req, res) => {
  const beforeId = req.query?.beforeId;
  const { streamId } = req.params;

  if (!streamId) {
    throw new ApiError(400, "StreamId is required");
  }

  const stream = await Stream.findById(streamId);

  if (!stream) {
    throw new ApiError(404, "Stream not found");
  }

  let comments;
  if (beforeId) {
    comments = await Comment.find({
      _id: { $lt: beforeId },
      stream: { $eq: stream },
    })
      .sort({ _id: -1 })
      .limit(20);
  } else {
    comments = comments = await Comment.find({
      stream: { $eq: stream },
    })
      .sort({ _id: -1 })
      .limit(10);
  }
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        comments,
      },
      "Comments fetched successfully"
    )
  );
});

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
        stream: data.streamId,
      });

      emitComment(savedComment);
    },
  });
})();

export { postComment, getComments };
