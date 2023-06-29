import express from "express";
import multer from "multer";
import * as fs from "fs";
import { v4 as uuidv4 } from "uuid";

// controllers
import * as phoneController from "../controllers/phoneController.js";
import * as userController from "../controllers/userController.js";

// middlewares
import validateUser from "../middlewares/validators/userValidator.js";
import validatePhone from "../middlewares/validators/phoneValidator.js";
import hashPassword from "../middlewares/authentication/hashPassword.js";
import addOnlyIfNotAlreadyExists from "../middlewares/authentication/addOnlyIfNotAlreadyExists.js";
import getUserByEmailWithPasswordAndPassToNext from "../middlewares/authentication/getUserByEmailWithPasswordAndPassToNext.js";
import verifyPassword from "../middlewares/authentication/verifyPassword.js";
import verifyToken from "../middlewares/authentication/verifyToken.js";

const router = express.Router();
const upload = multer({ dest: "./public/uploads/" });

/**
 * ROUTING
 */
// login
router.post("/login", getUserByEmailWithPasswordAndPassToNext, verifyPassword);

// authentication wall : verifyToken is activated for each route after this line
// router.use(verifyToken);
router.get("/smartphones", phoneController.getPhones);
router.get("/smartphones/:id", phoneController.getPhone);
// router.post("/smartphones", validatePhone, phoneController.postPhone);
// validatePhone require color/OS ?!
router.post("/smartphones", phoneController.postPhone);
router.delete("/smartphones/:id", phoneController.deletePhone);

// route for uploading 1 or multiple files
router.post("/upload_files", upload.array("files"), (req, res) => {
  if (!req?.files.length)
    return res.status(400).send("bad request: empty body");

  req?.files.forEach(({ filename, originalname }) => {
    // fs.rename(oldPath, newPath, callback);
    // use uuid package to give a unique filename and avoid file to be replaced
    fs.rename(
      `./public/uploads/${filename}`,
      `./public/uploads/${uuidv4()}-${originalname}`,
      (err) => {
        if (err) throw err;
      }
    );
  });

  res.json({ message: "tous les fichiers ont correctement ete recupere!" });
});

// routes for administration
router.get("/users", userController.getAllUsers);
router.post(
  "/users",
  validateUser,
  addOnlyIfNotAlreadyExists,
  hashPassword,
  userController.postUser
);
router.delete("/users/:id", userController.deleteUser);

export default router;
