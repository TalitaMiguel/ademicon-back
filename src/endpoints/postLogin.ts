import { Request, Response } from "express";
import { createUser } from "../data/createUser";
import jwt from 'jsonwebtoken';
import { selectUserLogin } from "../data/selectUserLogin";


export const postLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const SECRET_KEY = process.env.SECRET_KEY as string
    const { name, password } = req.body;

    if (!name || !password) {
      res.statusCode = 422;
      throw new Error("Please check inputs. Missing values.");
    }

    if (password.length < 6) {
      res.statusCode = 422;
      throw new Error(
        "Please check your password. Password must contain 6 digits"
      );
    }

    const login = await selectUserLogin(name, password);

    if (!login.length) {
      res.statusCode = 400;
      throw new Error("No user on this table");
    }

    const token:string = jwt.sign({userId: login[0].id}, SECRET_KEY, {expiresIn: 3600})

    res.status(200).send({auth: true, token});
  } catch (error: any) {
    res.status(res.statusCode).send(error.sqlMessage || error.message);
  }
};