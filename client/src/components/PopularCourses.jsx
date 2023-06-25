import React, { useContext, useEffect, useState } from "react";
import {
  MDBBadge,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { CourseData } from "../data";
import { Container } from "../styles/componentStyles/PopularCoursesStyles";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Box, LinearProgress } from "@mui/material";

const PopularCourses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const { user } = useContext(AuthContext);
  const [numOfEnrolledStudents, setNumOfEnrolledStudents] = useState({});
  let filteredArray = [];

  const getEnrolledStudentCount = async (courseId) => {
    try {
      const response = await axios.get(`http://localhost:8800/api/users/${courseId}/student-count`, {
        withCredentials: true,
      });
      return response.data.totalStudentCount;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8800/api/courses`);
        setCourses(data);

        // Fetch and store the enrolled student count for each course
        const enrolledStudentCounts = {};
        for (const course of data) {
          const count = await getEnrolledStudentCount(course._id);
          enrolledStudentCounts[course._id] = count;
        }
        setNumOfEnrolledStudents(enrolledStudentCounts);

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (courses.length !== 0) {
      const filteredArray = courses.filter(
        (item) => item.instructor === user._id
      );
      setFilteredCourses(filteredArray);
    }
  }, [courses, user._id]);

  return (
    <Container>
      <MDBTable>
        <MDBTableHead>
          <tr>
            <th>Course Name</th>
            <th>Enrolled</th>
            {/* <th>Status</th> */}
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {filteredCourses.length !== 0 ? (
            <>
              {filteredCourses.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={item.courseCover[0].url}
                        alt=""
                        style={{
                          width: "45px",
                          height: "45px",
                          objectFit: "cover",
                        }}
                        className="rounded-circle"
                      />
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{item.courseName}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ textAlign:'center'}}>{numOfEnrolledStudents[item._id] !== undefined ? numOfEnrolledStudents[item._id] : 'Loading...'}</td>
                  {/* <td>
                    <MDBBadge color="success" pill>
                      Status
                    </MDBBadge>
                  </td> */}
                </tr>
              ))}
            </>
          ) : (
            <tr style={{ color: "#f0634c" }}>
              You haven't created any courses.
            </tr>
          )}
        </MDBTableBody>
      </MDBTable>
    </Container>
  );
};

export default PopularCourses;
