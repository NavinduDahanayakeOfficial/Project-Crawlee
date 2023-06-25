import AddIcon from "@mui/icons-material/Add";
import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Container,
  DynamicFieldWrapper,
  FieldWrapper,
  ImageWrapper,
  StyledButton,
  StyledErrorMessage,
  StyledField,
  StyledLabel,
  StyledSecondaryButton,
  SubmitButton,
} from "../styles/pageStyles/CreateCourseStyles";
import { Form, Formik, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Snackbar } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CourseEdit = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [query, setQuery] = useState("Create Course");
  const [courseCoverUrl, setCourseCoverUrl] = useState("");
  const [courseCoverPublicId, setCourseCoverPublicId] = useState("");
  const [submitButton, setSubmitButton] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarType, setSnackbarType] = useState("");
  const [snackbarMsg, setSnackbarMsg] = useState("");

  const navigate = useNavigate();

  //Snackbar Functions
  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const { user, dispatch } = useContext(AuthContext);

  const initialValues = {
    courseName: "",
    description: "",
    courseCategory: "",
    instructor: "",
    instructorName: "",
    courseCover: [],
    lessons: [{ title: "", description: "", material: [] }],
  };

  const onSubmit = async (values) => {
    
    // try {
    //   const response = await axios.post(
    //     "http://localhost:8800/api/courses",
    //     values
    //   );
    //   console.log(response.data);
    //   setSubmitButton(true);
    //   setSnackbarType("success");
    //   setSnackbarMsg("Created Successfully");
    //   handleOpenSnackbar();
    //   setTimeout(() => {
    //     navigate("/courses");
    //   }, 2000);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const validationSchema = Yup.object({
    courseName: Yup.string().required("Required"),
  });

  initialValues.instructor = user._id;
  initialValues.instructorName = user.username;

  console.log(user._id);

  function showWidget(index, setFieldValue) {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "srilankan-cloudname",
        uploadPreset: "aonqrjz7",
      },
      (error, result) => {
        if (!error && result.event === "success") {
          const material = {
            url: result.info.url,
            public_id: result.info.public_id,
          };
          setFieldValue(`lessons[${index}].material`, material);
        }
      }
    );
    widget.open();
  }

  function showWidgetCover(setFieldValue) {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "srilankan-cloudname",
        uploadPreset: "aonqrjz7",
      },
      (error, result) => {
        if (!error && result.event === "success") {
          const image = {
            url: result.info.url,
            public_id: result.info.public_id,
          };
          setFieldValue("courseCover", [image]);
          setCourseCoverUrl(result.info.url);
          setCourseCoverPublicId(result.info.public_id);
        }
      }
    );
    widget.open();
  }

  function handleRemoveImg(courseCoverPublicId, setFieldValue) {
    console.log(courseCoverPublicId);

    axios
      .delete(`http://localhost:8800/api/images/${courseCoverPublicId}`)
      .then((res) => {
        const image = null;
        setFieldValue("courseCover", [image]);
        setCourseCoverUrl(null);
      })
      .catch((e) => console.log(e));
  }
  return (
    <>
      <Sidebar setQuery={setQuery} />
      console.log(setQuery);
      <Navbar query={query} />
      <Container>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={5000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarType}
            sx={{ width: "100%" }}
          >
            {snackbarMsg}
          </Alert>
        </Snackbar>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue }) => (
            <Form
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                width: "70%",
              }}
            >
              <FieldWrapper>
                <StyledLabel htmlFor="courseName">Course Name</StyledLabel>
                <StyledField type="text" id="courseName" name="courseName" />
                <StyledErrorMessage component="span" name="courseName" />
              </FieldWrapper>

              <FieldWrapper>
                <StyledLabel htmlFor="description">Description</StyledLabel>
                <StyledField type="text" id="description" name="description" />
              </FieldWrapper>

              <FieldWrapper>
                <StyledLabel htmlFor="courseCategory">
                  Course Category
                </StyledLabel>
                <StyledField
                  type="text"
                  id="courseCategory"
                  name="courseCategory"
                />
              </FieldWrapper>

              <FieldWrapper>
                <StyledLabel htmlFor="courseCover">
                  Course Cover Image
                </StyledLabel>
                <StyledButton
                  type="button"
                  name="courseCover"
                  onClick={() => showWidgetCover(setFieldValue)}
                >
                  Upload Course Cover
                </StyledButton>
              </FieldWrapper>
              {courseCoverUrl && (
                <ImageWrapper>
                  <img src={courseCoverUrl} alt="" width="400" height="200" />
                  <CancelIcon
                    onClick={() =>
                      handleRemoveImg(courseCoverPublicId, setFieldValue)
                    }
                  />
                </ImageWrapper>
              )}
              {/* {courseCoverUrl && (
                <><CancelIcon/>
                <img src={courseCoverUrl} alt="" width="400" height="200" /></> // Render the image tag only if the course cover URL is available
                
              )} */}

              <FieldWrapper>
                <h4 htmlFor="addLessons">Add Lessons</h4>
              </FieldWrapper>

              <FieldArray name="lessons">
                {(fieldArrayProps) => {
                  // console.log("fieldArrayProps", fieldArrayProps);
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  const { lessons } = values;
                  return (
                    <div>
                      {lessons.map((lesson, index) => (
                        <div key={index}>
                          <DynamicFieldWrapper>
                            <StyledLabel htmlFor="instructor">
                              Title
                            </StyledLabel>
                            <StyledField
                              type="text"
                              name={`lessons[${index}].title`}
                            />
                            <StyledLabel htmlFor="instructor">
                              Description
                            </StyledLabel>
                            <StyledField
                              type="text"
                              name={`lessons[${index}].description`}
                            />

                            {!values.lessons[index].material?.url && (
                              <StyledButton
                                type="button"
                                name={`lessons[${index}].material`}
                                onClick={() => showWidget(index, setFieldValue)}
                              >
                                Upload Material
                              </StyledButton>
                            )}

                            <div className="images-preview-container">
                              <div className="image-preview">
                                {values.lessons[index].material?.url && (
                                  // <img
                                  //   src={
                                  //     values.lessons[index].material?.url || ""
                                  //   }
                                  //   alt=""
                                  //   width="400"
                                  //   height="200"
                                  // />
                                  <video
                                    width="320"
                                    height="240"
                                    controls
                                    style={{ borderRadius: "10px" }}
                                  >
                                    <source
                                      src={
                                        values.lessons[index].material?.url ||
                                        ""
                                      }
                                      type="video/mp4"
                                    />
                                  </video>
                                )}
                              </div>
                            </div>

                            {
                              <StyledSecondaryButton
                                type="button"
                                onClick={() => remove(index)}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  Remove
                                  <DeleteIcon fontSize="small" />
                                </div>
                              </StyledSecondaryButton>
                            }
                          </DynamicFieldWrapper>
                        </div>
                      ))}

                      <StyledButton type="button" onClick={() => push("")}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          Add
                          <AddIcon fontSize="small" />
                        </div>
                      </StyledButton>
                    </div>
                  );
                }}
              </FieldArray>

              <SubmitButton type="submit" disabled={submitButton}>
                Submit
              </SubmitButton>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default CourseEdit;
