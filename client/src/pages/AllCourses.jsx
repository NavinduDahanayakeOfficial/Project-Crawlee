import React, { useEffect, useState } from "react";
import NavbarHorizontal from "../components/NavbarHorizontal";
import styled from "styled-components";
import CourseLarge from "../components/CourseLarge";
import axios from "axios";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: unset;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: unset;
  }
`;

const Container = styled.div`
  padding: 10px;
  margin: 20px;
`;
const CourseWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
`;

const AllCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8800/api/courses`)
      .then(({ data }) => {
        console.log("courses", data);
        setCourses(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      <NavbarHorizontal />
      <Container>
        <CourseWrapper>
          {courses.length !== 0 &&
            courses.map((item, index) => (
              <StyledLink key={index} to={`/courses/${item._id}`}>
                <CourseLarge
                  image={
                    item.courseCover.length != 0 ? item.courseCover[0].url : ""
                  }
                  category={item.courseCategory}
                  coursename={item.courseName}
                />
              </StyledLink>
            ))}
        </CourseWrapper>
      </Container>
    </>
  );
};

export default AllCourses;
