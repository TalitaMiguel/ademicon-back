import { Request, Response } from "express";
import { deletedUser } from "../data/deletedUser";

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id

    if (!id) {
      res.statusCode = 422;
      throw new Error("Please check inputs. Missing values.");
    }

    await deletedUser(id);

    res.status(200).send("user successfully deleted.");
  } catch (error: any) {
    res.status(res.statusCode).send(error.sqlMessage || error.message);
  }
};
