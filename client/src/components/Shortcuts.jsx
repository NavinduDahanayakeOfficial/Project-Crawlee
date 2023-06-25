import React from "react";
import { ImBooks } from "react-icons/im";
import { SiGooglechat } from "react-icons/si";
import {
  BottomSection,
  Button,
  Container,
  Header,
  Icon,
  MiddleSection,
  Shortcut,
  ShortcutName,
  TopSection,
} from "../styles/componentStyles/ShortcutsStyles";
import { Link } from "react-router-dom";
import styled from "styled-components";

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

const Shortcuts = () => {
  return (
    <Container>
      <TopSection>
        <Header>Shortcuts</Header>
      </TopSection>
      <MiddleSection>
        <StyledLink to={"/courses"}>
          <Shortcut>
            <Icon>
              <ImBooks />
            </Icon>
            <ShortcutName>Courses</ShortcutName>
          </Shortcut>
        </StyledLink>
        <StyledLink to={"http://127.0.0.1:5173"}>
          <Shortcut>
            <Icon>
              <SiGooglechat />
            </Icon>
            <ShortcutName>Messages</ShortcutName>
          </Shortcut>
        </StyledLink>
      </MiddleSection>
      <BottomSection>
        <StyledLink to={"/create-course"}>
          <Button>Create Course</Button>
        </StyledLink>
      </BottomSection>
    </Container>
  );
};

export default Shortcuts;
