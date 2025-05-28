import Stream from "../model/Stream.js";
import { asyncHandler } from "..//utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const createStream = asyncHandler(async (req, res) => {
  const { title } = req.body;

  const stream = await Stream.create({
    title: title,
    userId: req.userId,
  });

  if (!stream) {
    throw new ApiError("Something went wrong while creating stream");
  }

  res.status(201).json(
    new ApiResponse(
      201,
      {
        streamId: stream._id,
      },
      "Stream created successfully"
    )
  );
});

const getStream = asyncHandler(async (req, res) => {
  const { streamId } = req.params;

  if (!streamId) {
    throw new ApiError(400, "StreamId is required");
  }

  const stream = await Stream.findById(streamId);

  if (!stream) {
    throw new ApiError(404, "Stream not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        stream,
      },
      "Stream data fetched successfully"
    )
  );
});

const updateVideo = asyncHandler(async (req, res) => {
  const { streamId } = req.params;
  const { videoUrl } = req.body;

  if (!streamId) {
    throw new ApiError(400, "StreamId is required");
  }

  const result = await Stream.updateOne(
    { _id: { $eq: streamId } },
    { $set: { videoUrl: videoUrl } }
  );

  if (result.modifiedCount === 0) {
    throw new Error("No matching stream to update");
  }

  res.status(200).json(new ApiResponse(200, {}, "Video updated successfully"));
});

export { createStream, getStream, updateVideo };
