import TeacherRequest from "../models/TeacherRequest.js";

export const createTeacherRequest = async (req, res, next) => {
  const newTeacherRequest = new TeacherRequest(req.body);
  try {
    const savedTeacherRequest = await newTeacherRequest.save();
    res.status(200).json(savedTeacherRequest);
  } catch (err) {
    next(err);
  }
};

export const updateTeacherRequest = async (req, res, next) => {
  try {
    const updatedTeacherRequest = await TeacherRequest.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedTeacherRequest);
  } catch (err) {
    next(err);
  }
};

export const deleteTeacherRequest = async (req, res, next) => {
  try {
    await TeacherRequest.findByIdAndDelete(req.params.id);
    res.status(200).json("TeacherRequest has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getTeacherRequest = async (req, res, next) => {
  try {
    const teacherRequest = await TeacherRequest.findById(req.params.id);
    res.status(200).json(teacherRequest);
  } catch (err) {
    next(err);
  }
};

export const getTeacherRequests = async (req, res, next) => {
  try {
    const teacherRequests = await TeacherRequest.find();
    res.status(200).json(teacherRequests);
  } catch (err) {
    next(err);
  }
};


