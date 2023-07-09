import express from "express";
import {
  changeUserRole,
  deleteUser,
  enrollCourse,
  getTotalCoursesCreated,
  getTotalEnrolledCount,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/userController.js";
import { adminOnly, protect } from "../utils/verifyToken.js";


const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//     res.send("Hello, You are now logged in");
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("Hello User, You are now logged in and you can delete your account");
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("Hello Admin, You are now logged in and you can delete all accounts");
// });

//UPDATE
router.put("/:id", protect, updateUser);

//DELETE
router.delete("/:id",  protect, deleteUser);

//GET
router.get("/:id",  protect, getUser);

//GETALL
router.get("/",  protect, adminOnly, getUsers);

//ENROLL COURSE
router.post("/enroll",  protect, enrollCourse);

//GET TOTAL ENROLLMENT COUNT CERTAIN COURSE
router.get("/:courseId/student-count",  protect,  getTotalEnrolledCount);

//GET TOTAL COURSE COUNT BY TEACHER
router.get("/:userId/total-courses-created",  protect,  getTotalCoursesCreated);

//Change the user role
router.patch("/:userId/changeRole",  protect, adminOnly, changeUserRole);

export default router;
