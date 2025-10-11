import Swap from "../models/Swap.js";
import Course from "../models/Course.js";

// Step 1: A → B (request interest in B’s course)
export const createSwapRequest = async (req, res) => {
  try {
    const { requestedCourseId, receiverId, message } = req.body;
    const requesterId = req.user._id;

    const requestedCourse = await Course.findById(requestedCourseId);
    if (!requestedCourse) return res.status(404).json({ message: "Requested course not found" });

    const swap = await Swap.create({
      requester: requesterId,
      receiver: receiverId,
      requestedCourse: requestedCourseId,
      message
    });

    res.status(201).json(swap);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Step 2: B → A (counter or reject)
export const respondToSwap = async (req, res) => {
  try {
    const { swapId } = req.params;
    const { action, offeredCourseId } = req.body;
    const userId = req.user._id;

    const swap = await Swap.findById(swapId);
    if (!swap) return res.status(404).json({ message: "Swap not found" });
    if (swap.receiver.toString() !== userId.toString())
      return res.status(403).json({ message: "Not authorized" });

    if (action === "counter") {
      swap.offeredCourse = offeredCourseId;
      swap.status = "Countered";
    } else if (action === "reject") {
      swap.status = "Rejected";
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    await swap.save();
    res.json(swap);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Step 3: A → finalize (accept or reject counter)
export const finalizeSwap = async (req, res) => {
  try {
    const { swapId } = req.params;
    const { action } = req.body;
    const userId = req.user._id;

    const swap = await Swap.findById(swapId);
    if (!swap) return res.status(404).json({ message: "Swap not found" });
    if (swap.requester.toString() !== userId.toString())
      return res.status(403).json({ message: "Not authorized" });

    if (swap.status !== "Countered")
      return res.status(400).json({ message: "No counteroffer to respond to" });

    swap.status = action === "accept" ? "Accepted" : "Rejected";
    await swap.save();
    res.json(swap);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get swaps for logged in user
export const getMySwaps = async (req, res) => {
  try {
    const swaps = await Swap.find({
      $or: [{ requester: req.user._id }, { receiver: req.user._id }]
    })
      .populate("requestedCourse offeredCourse requester receiver", "title name email");
    res.json(swaps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
