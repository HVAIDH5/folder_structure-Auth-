import express from 'express';
import Register from '../controllers/Register.controllers.js';
import { RegisterSchema } from '../ValidationSchema/RegisterSchema.js';
import Login from '../controllers/Login.controllers.js';
import { LoginSchema } from '../ValidationSchema/LoginSchema.js';
import { createTodo } from '../controllers/Todo.controllers.js';
import { check } from 'express-validator';
import { GetTodos } from '../controllers/TodoList.controllers.js';
import { MarkTodo } from '../controllers/MarkTodo.controllers.js';
import { RemoveTodo } from '../controllers/RemoveTodo.controllers.js';


const apiRoute=express.Router();
export const apiProtected=express.Router();

apiRoute.post('/register',RegisterSchema,Register);
apiRoute.post('/Login',LoginSchema,Login);

// protected routes
apiProtected.post("/createTodo",[check("desc","Todo desc is required").
exists()],createTodo);

apiProtected.post("/marktodo",[check("todo_id","Todo id is required").
exists()],MarkTodo);

apiProtected.post("/deletetodo",[check("todo_id","Todo id is required").
exists()],RemoveTodo);

apiProtected.get("/todoList",GetTodos);


export default apiRoute;