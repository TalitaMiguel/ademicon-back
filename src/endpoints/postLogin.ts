import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { selectUserLogin } from "../data/selectUserLogin";


export const postLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const JWT_KEY = process.env.JWT_KEY as string
    const { email, password } = req.body;

    if (!email || !password) {
      res.statusCode = 422;
      throw new Error("Please check inputs. Missing values.");
    }

    const emailValidation = (email: string) => {
      const validation = /\S+@\S+\.\S+/;
      return validation.test(email);
    };

    if (!emailValidation(email)) {
      res.statusCode = 400;
      throw new Error(`Please check email. Invalid email provided: ${email}.`);
    }

    if (password.length < 6) {
      res.statusCode = 422;
      throw new Error(
        "Please check your password. Password must contain 6 digits"
      );
    }

    const login = await selectUserLogin(email, password);

    if (!login.length) {
      res.statusCode = 400;
      throw new Error("No user on this table");
    }

    const token:string = jwt.sign({userId: login[0].id}, JWT_KEY, {expiresIn: 3600})

    res.status(200).send({message:"Successfully authenticated",auth: true, token, id:login[0].id});
  } catch (error: any) {
    res.status(res.statusCode).send(error.sqlMessage || error.message);
  }
};
