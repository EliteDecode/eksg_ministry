import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { Typography } from "antd";
import LoginForm from "@/components/Forms/LoginForm";
import logo from "../../assets/images/eklogo.png";

const Login = () => {
  return (
    <Box className="h-screen bg-[#f7f7f7]">
      <Box className="bg-white  py-5">
        <Box className="container-c">
          <Box className="flex items-center">
            <img src={logo} alt="" className="sm:w-[6%] w-[20%]" />

            <Box className="text-center w-[100%]">
              <Typography className="sm:text-[30px] text-[20px] capitalize font-bold">
                Ekiti state admin portal
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        className="container-c sm:w-[40%] w-[100%] rounded-md sm:h-[50vh] h-[30vh] flex flex-col items-center justify-center m-auto bg-[white]"
        style={{ marginTop: 100 }}>
        <LoginForm />
      </Box>
    </Box>
  );
};

export default Login;
