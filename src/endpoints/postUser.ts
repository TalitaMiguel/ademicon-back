import { Request, Response } from "express";
import { createUser } from "../data/createUser";
import { User } from "../types/user";

export const postUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.statusCode = 422;
      throw new Error("Please check inputs. Missing values.");
    }

    if (password.length < 6) {
      res.statusCode = 422;
      throw new Error(
        "Please check your password. Password must contain 6 digits"
      );
    }

    const emailValidation = (email: string) => {
      const validation = /\S+@\S+\.\S+/;
      return validation.test(email);
    };

    if (!emailValidation(email)) {
      res.statusCode = 400;
      throw new Error(`Please check email. Invalid email provided: ${email}.`);
    }

    const newUser: User = {
      name_user: name,
      email_user: email,
      password_user: password,
    };

    const result = await createUser(newUser);

    if(!result) {
      res.statusCode = 400
      throw new Error("There was an error registering the user");
    }

    res.status(201).send("User created successfully.");
  } catch (error: any) {
    res.status(res.statusCode).send(error.sqlMessage || error.message);
  }
};
