const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.get("/api/users", async (request, response) => {
  try {
    const users = await User.find({});
    response.json(users);
  } catch (e) {
    console.error("Error fetching all users", e);
    response
      .status(500)
      .json({ error: "An error occurred while fetching users" });
  }
});

userRouter.post("/api/users", async (request, response) => {
  try {
    const body = request.body;

    const newUser = new User({ 
      userId: body.userId,
    });

    const savedUser = await newUser.save();
    response.status(201).json(savedUser); 
  } catch (e) {
    console.error(e);
    response
      .status(500)
      .json({ error: "An error occurred while creating the user" });
  }
});

module.exports = userRouter;

