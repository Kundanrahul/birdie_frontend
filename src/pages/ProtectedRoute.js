import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import PageLoading from "./pageLoading";
// import { dividerClasses } from "@mui/material";
const ProtectedRoute = ({ children }) => {
    const [user,isLoading]= useAuthState(auth);

    // console.log("Check user in Private: ", user);
    if(isLoading) return <PageLoading/> ;
    if (!user) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default ProtectedRoute;