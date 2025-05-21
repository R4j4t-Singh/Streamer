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

export { createStream };
