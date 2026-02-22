import { Request, Response } from "express";
import { ReleaseModel } from "../models/release.model";

export const ReleaseController = {
  async create(req: Request, res: Response) {
    try {
      const { name, release_date, additional_info } = req.body;

      const release = await ReleaseModel.create(
        name,
        release_date,
        additional_info,
      );

      res.json(release);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const releases = await ReleaseModel.findAll();

      res.json(releases);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const { name, release_date, steps, additional_info } = req.body;

      const release = await ReleaseModel.update(
        id,
        name,
        release_date,
        steps,
        additional_info,
      );

      res.json(release);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id as string;

      await ReleaseModel.delete(id);

      res.json({ message: "Deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  },
};
