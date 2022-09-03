import { Request, Response } from "express";
import { updateUser } from "../data/updateUser";
import { User } from "../types/user";

export const putUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id
    const { name, email, password } = req.body;

    if (!name || !email || !password || !id) {
      res.statusCode = 422;
      throw new Error("Please check inputs. Missing values.");
    }

    if(password.length < 6) {
      res.statusCode = 422;
      throw new Error("Please check your password. Password must contain 6 digits");
    }

    const emailValidation = (email: string) => {
      const validation = /\S+@\S+\.\S+/;
      return validation.test(email);
    };

    if (!emailValidation(email)) {
      res.statusCode = 400;
      throw new Error(`Please check email. Invalid email provided: ${email}.`);
    }

    const updatedUser: User = {
      name_user: name,
      email_user: email,
      password_user: password,
    };

    await updateUser(updatedUser, id);

    res.status(200).send("User changes made successfully.");
  } catch (error: any) {
    res.status(res.statusCode).send(error.sqlMessage || error.message);
  }
};
