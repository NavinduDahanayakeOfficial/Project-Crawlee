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
import { CenterContainer, Container, Icon, IconBtn, LeftContainer, Line, LinkText, LogoutBtn, NameContainer, RightContainer, Role, Username } from "../../styles/componentStyles/Admin/AdminNavbarStyles";
import { AuthContext } from "../../context/AuthContext";



export default function AdminNavbar() {

  const { user } = useContext(AuthContext);

  return (
    <Container data-aos="fade-down">
      <LeftContainer></LeftContainer>
      <CenterContainer>
      </CenterContainer>
      <RightContainer>
        <Icon>
          <FaUserCircle />
        </Icon>
        <NameContainer>
          <Username>{user.username}</Username>
          <Role>Admin</Role>
        </NameContainer>
      </RightContainer>
    </Container>
  );
}