import React, { useContext } from "react";
import { RiNotification2Fill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  CenterContainer,
  Container,
  Icon,
  IconBtn,
  LeftContainer,
  Line,
  LinkText,
  LogoutBtn,
  NameContainer,
  RightContainer,
  Role,
  Username,
} from "../styles/componentStyles/NavbarStyles";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import {
  FieldWrapper,
  StyledErrorMessage,
  StyledField,
  StyledLabel,
} from "../styles/pageStyles/CreateCourseStyles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input, TextField } from "@mui/material";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Navbar({ query }) {
  const teacher = true;
  const [show, setShow] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarType, setSnackbarType] = useState("");
  const [snackbarMsg, setSnackbarMsg] = useState("");

  const navigate = useNavigate();

  const { user, dispatch } = useContext(AuthContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleProfile = () => {
    setIsProfile(true);
    navigate("/profile");
  };

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

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      subjects: "",
      experience: "",
      requestedUser: user._id,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string().email("Must be a valid email").required("Required"),
      phoneNumber: Yup.string()
        .matches(/^\d+$/, "Phone number must be numeric")
        .min(10, "Phone number must be at least 10 digits")
        .max(10, "Phone number can have at most 10 digits")
        .required("Required"),
      subjects: Yup.string().required("Required"),
      experience: Yup.string().required("Required"),
    }),

    onSubmit: async (values) => {
      // console.log('values',values)
      try {
        const response = await axios.post(
          "http://localhost:8800/api/teacherrequests",
          values
        );
        console.log(response.data);
        setSnackbarType("success");
        setSnackbarMsg("Send Successfully");
        handleOpenSnackbar();
        
      } catch (error) {
        console.log(error);
        setSnackbarType("error");
        setSnackbarMsg(error.response.data);
        handleOpenSnackbar();
      }
    },
  });
  return (
    <Container data-aos="fade-down">
      <LeftContainer>
        {isProfile ? (query = "User Profile") : query}
      </LeftContainer>
      <CenterContainer>
        {user.isTeacher ? (
          <></>
        ) : (
          <>
            <LogoutBtn onClick={handleShow}>
              <IconBtn>
                <FaChalkboardTeacher />
              </IconBtn>
              <LinkText>Become a Teacher</LinkText>
            </LogoutBtn>

            <Modal show={show} onHide={handleClose} size="xl">
              <Modal.Header closeButton>
                <Modal.Title>How to become an Instructor</Modal.Title>
              </Modal.Header>
              <Modal.Body>
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

                <form
                  action=""
                  className="create-order-form"
                  onSubmit={formik.handleSubmit}
                >
                  <Row>
                    <Col>
                      <TextField
                        placeholder="First Name"
                        size="small"
                        fullWidth
                        margin="normal"
                        type="text"
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.firstName &&
                          Boolean(formik.errors.firstName)
                        }
                        helperText={
                          formik.touched.firstName && formik.errors.firstName
                            ? formik.errors.firstName
                            : " "
                        }
                      />
                    </Col>
                    <Col>
                      <TextField
                        placeholder="Last Name"
                        size="small"
                        fullWidth
                        margin="normal"
                        type="text"
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.lastName &&
                          Boolean(formik.errors.lastName)
                        }
                        helperText={
                          formik.touched.lastName && formik.errors.lastName
                            ? formik.errors.lastName
                            : " "
                        }
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <TextField
                        placeholder="Email"
                        fullWidth
                        margin="normal"
                        size="small"
                        type="text"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={
                          formik.touched.email && formik.errors.email
                            ? formik.errors.email
                            : " "
                        }
                      />
                    </Col>
                    <Col>
                      <TextField
                        placeholder="Phone Number"
                        fullWidth
                        margin="normal"
                        size="small"
                        type="text"
                        name="phoneNumber"
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.phoneNumber &&
                          Boolean(formik.errors.phoneNumber)
                        }
                        helperText={
                          formik.touched.phoneNumber &&
                          formik.errors.phoneNumber
                            ? formik.errors.phoneNumber
                            : " "
                        }
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <TextField
                        placeholder="Subjects"
                        sx={{ width: 600 }}
                        margin="normal"
                        size="small"
                        type="text"
                        name="subjects"
                        value={formik.values.subjects}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.subjects &&
                          Boolean(formik.errors.subjects)
                        }
                        helperText={
                          formik.touched.subjects && formik.errors.subjects
                            ? formik.errors.subjects
                            : " "
                        }
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <TextField
                        placeholder="Experience/ Qualifications"
                        sx={{ width: 600 }}
                        margin="normal"
                        size="small"
                        type="text"
                        name="experience"
                        value={formik.values.experience}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.experience &&
                          Boolean(formik.errors.experience)
                        }
                        helperText={
                          formik.touched.experience && formik.errors.experience
                            ? formik.errors.experience
                            : " "
                        }
                      />
                      <TextField
                        placeholder="Experience/ Qualifications"
                        sx={{ width: 600 }}
                        margin="normal"
                        size="small"
                        type="text"
                        name="requestedUser"
                        value={user._id}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        hidden
                      />
                    </Col>
                  </Row>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button
                      variant="primary"
                      style={{ backgroundColor: "#f0634c", border: "none" }}
                      onClick={formik.handleSubmit}
                    >
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </form>
              </Modal.Body>
            </Modal>
          </>
        )}
      </CenterContainer>
      <RightContainer>
        <Icon>
          <RiNotification2Fill />
        </Icon>
        <Line></Line>
        <Icon>
          <FaUserCircle />
        </Icon>

        <NameContainer onClick={handleProfile}>
          <Username style={{ cursor: "pointer" }}>{user.username}</Username>
          <Role>{user.isTeacher ? "Teacher" : "Student"}</Role>
        </NameContainer>
      </RightContainer>
    </Container>
  );
}
