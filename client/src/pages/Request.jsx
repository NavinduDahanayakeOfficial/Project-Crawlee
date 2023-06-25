import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminSidebar from "../components/AdminComponents/AdminSidebar";
import AdminNavbar from "../components/AdminComponents/AdminNavbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const LeftContainer = styled.div``;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TopContainer = styled.div`
  margin-left: 255px;
  margin-bottom: 30px;
`;

const BottomContainer = styled.div`
  margin: 0 30px 0 280px;
`;

const RequestCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 10px;
`;

const RequestCard = styled.div`
  background-color: #ececec;
  width: 60%;
  padding: 10px;
  border-radius: 10px;
  
`;

const StyledRow = styled(Row)`
  margin: 20px 0;
`;
const Request = () => {
  const [query, setQuery] = useState("Dashboard");

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8800/api/teacherrequests`)
      .then(({ data }) => {
        console.log("requests", data);
        setRequests(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <Container>
      <LeftContainer>
        <AdminSidebar setQuery={setQuery} />
      </LeftContainer>

      <RightContainer>
        <TopContainer>
          <AdminNavbar />
        </TopContainer>
        <BottomContainer>
            <h5>Teacher Requests</h5>
          <RequestCardContainer>
            {requests.length !== 0 &&
              requests.map((item, index) => (
                <RequestCard>
                  <StyledRow>
                    <Col>UserId:&nbsp;{item.requestedUser} </Col>
                  </StyledRow>
                  <StyledRow>
                    <Col>First Name:&nbsp;{item.firstName}</Col>
                    <Col>Last Name:&nbsp;{item.lastName}</Col>
                  </StyledRow>
                  <StyledRow>
                    <Col>Email:&nbsp;{item.email}</Col>
                    <Col>Phone Number:&nbsp;{item.phoneNumber}</Col>
                  </StyledRow>
                  <StyledRow>
                    <Col>Subjects:&nbsp;{item.subjects}</Col>
                  </StyledRow>
                  <StyledRow>
                    <Col>Experience:&nbsp;{item.experience}</Col>
                  </StyledRow>
                </RequestCard>
              ))}
          </RequestCardContainer>
        </BottomContainer>
      </RightContainer>
    </Container>
  );
};

export default Request;
