import express from "express";
import { 
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  uploadAvatar
} from "../userscontroller.mjs";

import multer from "multer";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage()
});

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

router.post("/:id/upload", upload.single("avatar"), uploadAvatar);

export default router;
