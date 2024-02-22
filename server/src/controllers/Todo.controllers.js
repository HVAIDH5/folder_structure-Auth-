import { StatusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helpers.js";
import { validationResult } from "express-validator";
import Todo from "../models/Todo.js";
import User from "../models/User.js";

export const createTodo = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(
        jsonGenerate(
          StatusCode.VALIDATION_ERROR,
          "Todo is required",
          errors.mapped()
        )
      );
    }
    
    const result = await Todo.create({
      userId: req.userId,
      desc: req.body.desc,
    });
    if (result) {
      const user = await User.findOneAndUpdate(
        { _id: req.userId },
        {
          $push: { todos: result },
        }
      );
      return res.json(
        jsonGenerate(StatusCode.SUCCESS, "Todo created successful", result)
      );
    }
  } catch (error) {
    console.log(error)
    return res.json(
      jsonGenerate(
        StatusCode.UNPROCESSABLE_ENTITY,
        "something went wrong",
        error
      )
    );
  }
};
