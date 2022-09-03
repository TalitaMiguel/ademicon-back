import { Request, Response } from "express";
import { selectAllUsers } from "../data/selectAllUsers";

export const getAllUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await selectAllUsers();

    if (!users.length) {
      res.statusCode = 400;
      throw new Error("No user on this table");
    }

    res.status(200).send(users);
  } catch (error: any) {
    res.status(res.statusCode).send(error.sqlMessage || error.message);
  }
};