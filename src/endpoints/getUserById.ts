import { Request, Response } from "express";
import { selectUserById } from "../data/selectUserById";

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {

    const id = req.params.id

    if (!id) {
      res.statusCode = 422;
      throw new Error("Please check inputs. Missing values.");
    }

    const users = await selectUserById(id);

    if (!users.length) {
      res.statusCode = 400;
      throw new Error("No user on this table");
    }

    res.status(200).send(users);
  } catch (error: any) {
    res.status(res.statusCode).send(error.sqlMessage || error.message);
  }
};