import express, { Router } from "express";
import {
    createTeacherRequest, deleteTeacherRequest, getTeacherRequest, getTeacherRequests, updateTeacherRequest
  } from "../controllers/teacherRequestController.js";
import { protect } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/",  protect, createTeacherRequest);

//UPDATE
router.put("/:id",  protect,  updateTeacherRequest);

//DELETE
router.delete("/:id",  protect, deleteTeacherRequest);

//GET
router.get("/:id",  protect, getTeacherRequest);

//GETALL
router.get("/",  protect, getTeacherRequests);



export default router;
