import express from "express";
import { ReleaseController } from "../controllers/release.controller";

const router = express.Router();

router.get("/", ReleaseController.getAll);

router.post("/", ReleaseController.create);

router.patch("/:id", ReleaseController.update);

router.delete("/:id", ReleaseController.delete);

export default router;
