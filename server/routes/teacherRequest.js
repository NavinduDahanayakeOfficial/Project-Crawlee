import express, { Router } from "express";
import {
    createTeacherRequest, deleteTeacherRequest, getTeacherRequest, getTeacherRequests, updateTeacherRequest
  } from "../controllers/teacherRequestController.js";

const router = express.Router();

//CREATE
router.post("/", createTeacherRequest);

//UPDATE
router.put("/:id",  updateTeacherRequest);

//DELETE
router.delete("/:id", deleteTeacherRequest);

//GET
router.get("/:id", getTeacherRequest);

//GETALL
router.get("/", getTeacherRequests);



export default router;
