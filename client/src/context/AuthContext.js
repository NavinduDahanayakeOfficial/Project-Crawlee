import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const INITIAL_STATE = {
   user: JSON.parse(localStorage.getItem("user")) || null,
   loading: false,
   error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
   switch (action.type) {
      case "LOGIN_START":
         return {
            user: null,
            loading: true,
            error: null,
         };
      case "LOGIN_SUCCESS":
         return {
            user: action.payload,
            loading: false,
            error: null,
         };
      case "LOGIN_FAILURE":
         return {
            user: null,
            loading: false,
            error: action.payload,
         };
      case "LOGOUT":
         return {
            user: null,
            loading: false,
            error: null,
         };
      default:
         return state;
   }
};

export const AuthContextProvider = ({ children }) => {
   const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

   useEffect(() => {
      const checkLoginStatus = async () => {
         try {
            const response = await axios.get(
               "http://localhost:8800/api/auth/loginStatus"
            );

            console.log(response.data);

            if (!response.data) {
               dispatch({ type: "LOGOUT" });
               toast.info("Session expired, please login");
               localStorage.removeItem("user");
            }else{
              localStorage.setItem("user", JSON.stringify(state.user));
            }
            
         } catch (error) {
            // Handle error if loginStatus request fails
            console.log("Error checking login status:", error);
         }
      };

      checkLoginStatus();
   }, [state.user]);

 

   return (
      <AuthContext.Provider
         value={{
            user: state.user,
            loading: state.loading,
            error: state.error,
            dispatch,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};
