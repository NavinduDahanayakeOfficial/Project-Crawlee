import React, {  useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import PasswordInput from "../../components/AuthComponents/PasswordInput";
import axios from "axios";
import { toast } from "react-toastify";
import {
   GlobalStyle,
   Form,
   Title,
   FirstMsg,
   FormInput,
   RemMeAndForgetPass,
   CustomCheck,
   Btn,
   BottomText,
   BoldTxt,
   ErrorMsg,
   Email,
   Password,
} from "../../styles/componentStyles/Authentication/AuthStyles";
import {Container, TopContainer, BottomContainer} from  "../../styles/pageStyles/AuthAndAdmin/AuthPageStyles"
import { MdEmail } from "react-icons/md";
import { AuthContext } from "../../context/AuthContext";

import NavbarHorizontal from "../../components/NavbarHorizontal";





const Login = () => {
   const navigate = useNavigate();
   const { dispatch } = useContext(AuthContext);

   const {
      values,
      errors,
      handleChange,
      handleBlur,
      touched,
      isSubmitting,
      handleSubmit,
   } = useFormik({
      initialValues: {
         email: "",
         password: "",
         rememberMe: false,
      },
      validationSchema: Yup.object({
         email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
         password: Yup.string().required("Password is required"),
      }),
      onSubmit: async (values) => {
         try {
            dispatch({ type: "LOGIN_START" });

            const userData = {
               email: values.email,
               password: values.password,
               rememberMe: values.rememberMe,
            };

            const response = await axios.post("http://localhost:8800/api/auth/login", userData);
            const user = response.data;

            dispatch({ type: "LOGIN_SUCCESS", payload: user });

            if(user.isAdmin){
               navigate("/userManagement");
               toast.success("Successfully logged in as an admin")
            }else{
               navigate("/");
               toast.success("Successfully logged in")
            }
         } catch (error) {
          toast.error(error.response.data.message);
            dispatch({ type: "LOGIN_FAILURE", payload: error.message });
         }
      },
   });

  

   return (
      <Container>
        <TopContainer>
          <NavbarHorizontal/>
        </TopContainer>

        <BottomContainer>
         <GlobalStyle />
         <Form onSubmit={handleSubmit} className="login">
            <Title>Login</Title>
            <FirstMsg>Welcome back</FirstMsg>

            <Email>
               <i className="email">
                  <MdEmail size={18} />
               </i>
               <FormInput
                  type="email"
                  className={touched.email && errors.email ? "error" : ""}
                  placeholder="Email"
                  required
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
               />
               {touched.email && errors.email && (
                  <ErrorMsg>{errors.email}</ErrorMsg>
               )}
            </Email>

            <Password>
               <PasswordInput
                  className={touched.password && errors.password ? "error" : ""}
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
               />
               {touched.password && errors.password && (
                  <ErrorMsg>{errors.password}</ErrorMsg>
               )}
            </Password>

            <RemMeAndForgetPass>
               <div>
                  <CustomCheck
                     type="checkbox"
                     id="customCheck1"
                     name="rememberMe"
                     value={values.rememberMe}
                     onChange={handleChange}
                  ></CustomCheck>{" "}
                  &nbsp;
                  <BoldTxt>
                     <label htmlFor="customCheck1">Remember me</label>
                  </BoldTxt>
               </div>

               <BoldTxt>
                  <Link to="/login/forgetPassword">Forgot password?</Link>
               </BoldTxt>
            </RemMeAndForgetPass>

            <Btn disabled={isSubmitting} type="submit">
               Log in
            </Btn>

            <BottomText>
               <BoldTxt>
                  Not registered yet?{" "}
                  <Link to="/signup">Create an account</Link>
               </BoldTxt>
            </BottomText>
         </Form>
         </BottomContainer>
      </Container>
   );
};

export default Login;