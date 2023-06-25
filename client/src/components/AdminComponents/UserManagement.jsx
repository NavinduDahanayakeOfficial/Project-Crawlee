import React, { useEffect, useContext, useState } from "react";
import InfoBox from "./InfoBox";
import {
  InfoRow,
  InfoTitle,
  TableBox,
  TopRow,
  UserList,
  Container,
  FilterRole,
} from "../../styles/componentStyles/Admin/AdminStyles";
import {
  FaUsers,
  FaUserAlt,
  FaChalkboardTeacher,
  FaUserShield,
  FaTrashAlt,
} from "react-icons/fa";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Search from "./Search";
import ChangeRole from "./ChangeRole";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Skeleton from "react-loading-skeleton"; // Import the Skeleton component from react-loading-skeleton

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const UserManagement = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [courseNames, setCourseNames] = useState({});
  const [filterRole, setFilterRole] = useState("All");
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state
  const [instructingCourseNames, setInstructingCourseNames] = useState({});

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:8800/api/users", {
        withCredentials: true,
      });

      const fetchedUsers = response.data;
      console.log(response.data)
      setUsers(fetchedUsers);
      setTotalUsers(fetchedUsers.length);

      // Filter users to get the total students
      const students = fetchedUsers.filter(
        (user) => !user.isAdmin && !user.isTeacher
      );
      setTotalStudents(students.length);

      // Filter users to get the total teachers
      const teachers = fetchedUsers.filter((user) => user.isTeacher);
      setTotalTeachers(teachers.length);

      // Filter users to get the total admins
      const admins = fetchedUsers.filter((user) => user.isAdmin);
      setTotalAdmins(admins.length);

      // Fetch and store the course names for each enrolled course of each user
      if (response.data) {
      for (const user of response.data) {
        const enrolledCourseNames = [];
        for (const enrolledCourse of user.enrolledCourses) {
          const courseResponse = await axios.get(
            `http://localhost:8800/api/courses/${enrolledCourse.courseId}`,
            {
              withCredentials: true,
            }
          );
          if (courseResponse && courseResponse.data && courseResponse.data.courseName) {
          enrolledCourseNames.push(courseResponse.data.courseName);
          console.log(enrolledCourseNames)
          }
        }
        courseNames[user._id] = enrolledCourseNames;
      }
    }

      console.log(courseNames);


      // Fetch and store the course names of each and every course that a teacher teachs
      const allCourses = await axios.get("http://localhost:8800/api/courses", {
        withCredentials: true,
      });


      for(const user of response.data){
        const teachingCourseNames = [];
        if (user.isTeacher) {
          for(const allCourse of allCourses.data){
            if(allCourse.instructor == user._id){
              teachingCourseNames.push(allCourse.courseName);
            }
          }
          instructingCourseNames[user._id] = teachingCourseNames;
      }
    }
    console.log(instructingCourseNames);

      setIsLoading(false); // Set isLoading to false after data fetching is complete
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Fetch users from the backend API
    fetchUsers();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  //delete a user
  const deleteUser = async (userId) => {
    try {
      confirmAlert({
        title: "Confirm Deletion",
        message: "Are you sure you want to delete this user?",
        buttons: [
          {
            label: "Yes",
            onClick: async () => {
              await axios.delete(`http://localhost:8800/api/users/${userId}`, {
                withCredentials: true,
              });
              // Fetch users again after deletion
              fetchUsers();
            },
          },
          {
            label: "No",
            onClick: () => {
              // Do nothing if the user cancels deletion
            },
          },
        ],
      });
      // Fetch users again after deletion
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  // Filter users based on the search query and selected role
  const filteredUsers = users.filter((user) => {
    const nameMatches = user.username
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const roleMatches =
      filterRole === "All" ||
      (filterRole === "Student" && !user.isAdmin && !user.isTeacher) ||
      (filterRole === "Teacher" && user.isTeacher) ||
      (filterRole === "Admin" && user.isAdmin);
    return nameMatches && roleMatches;
  });

  return (
    <>
      <Container>
        <InfoTitle>User stats</InfoTitle>
        <InfoRow>
          <InfoBox
            bgColor={"#ffe2e6"}
            circleColor={"#fa5a7c"}
            icon={<FaUsers size={40} />}
            count={totalUsers.toString()}
            desc={"Total Users"}
          />
          <InfoBox
            bgColor={"#fff4de"}
            circleColor={"#ff947a"}
            icon={<FaUserAlt size={40} />}
            count={totalStudents.toString()}
            desc={"Total Students"}
          />
          <InfoBox
            bgColor={"#dcfce7"}
            circleColor={"#3cd756"}
            icon={<FaChalkboardTeacher size={40} />}
            count={totalTeachers.toString()}
            desc={"Total Teachers"}
          />
          <InfoBox
            bgColor={"#d5f3fa"}
            circleColor={"#34d7fd"}
            icon={<FaUserShield size={40} />}
            count={totalAdmins.toString()}
            desc={"Total Admins"}
          />
        </InfoRow>

        <br></br>

        <UserList>
          <TopRow>
            <h3>Users</h3>

            <Search
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search users by name"
            />
          </TopRow>

          <FilterRole>
            <label htmlFor="filterRole">Filter by Role: </label> &nbsp;
            <select
              id="filterRole"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
              <option value="Admin">Admin</option>
            </select>
          </FilterRole>

          <br />

          <TableBox>
            {isLoading ? ( // Display skeleton loading effect while loading
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>
                      <Skeleton width={40} />
                    </th>
                    <th>
                      <Skeleton width={100} />
                    </th>
                    <th>
                      <Skeleton width={150} />
                    </th>
                    <th>
                      <Skeleton width={80} />
                    </th>
                    <th>
                      <Skeleton width={150} />
                    </th>
                    <th>
                      <Skeleton width={40} />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((index) => ( // Display multiple skeleton rows
                    <tr key={index}>
                      <td>
                        <Skeleton width={40} />
                      </td>
                      <td>
                        <Skeleton width={100} />
                      </td>
                      <td>
                        <Skeleton width={150} />
                      </td>
                      <td>
                        <Skeleton width={80} />
                      </td>
                      <td>
                        <Skeleton width={150} />
                      </td>
                      <td>
                        <Skeleton width={40} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              // Render actual data when not loading
              <Table striped bordered hover responsive>
                <thead>
                  <tr className="table-danger">
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Enrolled courses</th>
                    <th>Teaching courses</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>

                      <td>
                        <ChangeRole
                          userId={user._id}
                          initialRole={
                            user.isAdmin
                              ? "Admin"
                              : user.isTeacher
                              ? "Teacher"
                              : "Student"
                          }
                          fetchUsers={fetchUsers}
                        />
                      </td>
                      <td>
                      {user.isAdmin ? (
                        <p style={{ color: '#49d8f8', fontSize: '1rem' }}>
                          Cannot enroll 
                        </p>
                      ) : (
                        courseNames[user._id].map((courseName) => (
                          <p key={courseName}>{courseName}</p>
                        )
                        ))
                      }
                    </td>
                    <td>
                    { user.isTeacher ? (
                        instructingCourseNames[user._id].map((instructingCourseName) => (
                          <p key={instructingCourseName}>{instructingCourseName}</p>
                        )
                      )
                      ) : (
                        <p style={{ color: '#2bd742', fontSize: '1rem' }}>
                          Cannot teach
                        </p>
                      )
                      }
                    </td>
                      <td>
                        <FaTrashAlt
                          color="red"
                          style={{ cursor: "pointer" }}
                          onClick={() => deleteUser(user._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </TableBox>
        </UserList>
      </Container>
    </>
  );
};

export default UserManagement;