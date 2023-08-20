const express = require("express");
const reviewsRoutes = express();
const Reviews = require("../models/review-model");

//gets all reviews for a particular movie
reviewsRoutes.get("/movie/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    const filteredReviews = await Reviews.find({ movieId: movieId });
    res.status(200).json(filteredReviews);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

//create new review
reviewsRoutes.post("/new", async (req, res) => {
  try {
    const { user, content } = req.body;
    if (!user.length || !content.length) {
      return res
        .status(404)
        .json({ errorMessage: "User and review cannot be empty!" });
    }
    const newReview = new Reviews(req.body);
    await newReview?.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

//get a specific review
reviewsRoutes.get("/:id", async (req, res) => {
  try {
    const reviewId = req.params.id;
    const requestedReview = await Reviews.findOne({ _id: reviewId });
    if (!requestedReview) {
      return res
        .status(404)
        .json({ errorMessage: `Review with id ${reviewId} not found` });
    }
    res.status(200).json(requestedReview);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

//update a specific review
reviewsRoutes.put("/:id", async (req, res) => {
  try {
    const reviewId = req.params.id;
    const { user, content } = req.body;
    const foundReview = await Reviews.findOne({ _id: reviewId });
    if (!foundReview) {
      return res
        .status(404)
        .json({ errorMessage: `Review with id ${reviewId} not found` });
    }
    await Reviews.updateOne(
      { _id: reviewId },
      { user: user, content: content }
    );
    res.status(200).json({ successMessage: "Updated review successfully!" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

//delete a specific review
reviewsRoutes.delete("/:id", async (req, res) => {
  try {
    const reviewId = req.params.id;
    const foundReview = Reviews.findOne({ _id: reviewId });
    if (!foundReview) {
      return res
        .status(404)
        .json({ errorMessage: `Review with id ${reviewId} not found` });
    }
    await Reviews.deleteOne({ _id: reviewId });
    res.status(200).json({ successMessage: "Deleted review successfully!" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

module.exports = reviewsRoutes;
