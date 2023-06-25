import styled from "styled-components";


export const Wrapper = styled.div`
  display: flex;
`;

export const Container = styled.div`
  flex: 1;
  margin: 5px;
  max-width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: #dadada;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  background-color: white;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.02);
  }
`;

export const ImageContainer = styled.img`
  width: 100%;
  background-color: green;
  flex: 5;
  object-fit: cover;
`;
export const InfoContainer = styled.div`
  width: 100%;
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const CourseCategory = styled.span`
  font-size: 20px;
  margin: 5px 0px 0px 10px;
  font-weight: 200;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
`;

export const DividerContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const Divider = styled.div`
  background-color: #f0634c;
  width: 95%;
  height: 1px;
`;
export const CourseName = styled.h2`
  font-size: 20px;
  font-weight: 900;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 90%;
  margin: 0px 0px 10px 10px;
`;