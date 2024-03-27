import HeaderTitle from "@/components/dashboard/HeaderTitle";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import SchoolsTables from "@/components/Tables/SchoolsTables";
import teachersImg from "../../assets/icons/teachers-day.png";
import { Typography } from "antd";
import TeachersHeader from "@/components/dashboard/SchoolsHeader";
import { Button } from "@/components/ui/button";
import TeachersTables from "@/components/Tables/StudentsTables";
import { subjectsList } from "@/lib/utils";
import SchoolsHeader from "@/components/dashboard/SchoolsHeader";
import { Link } from "react-router-dom";
import { Add } from "@mui/icons-material";
import AdminTables from "@/components/Tables/AdminTables";
import { AddAdmin } from "@/components/Forms/AddAdmin";
import { getAdmins } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";
const AdminPage = () => {
  const [class_taken, setClassTaken] = useState("CE");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdmins());
  }, []);

  return (
    <Box className="sm:p-5 space-y-4 p-3">
      <Box className="flex space-x-2 sm:justify-end justify-start items-center ">
        <AddAdmin />
      </Box>

      <Box className={`w-full mt-5 bg-white p-5 rounded-md mb-5`}>
        <Box className="flex flex-wrap space-y-4 items-center justify-between">
          <Box className="flex items-center space-x-2">
            <img src={teachersImg} alt="dashboard icon" className="w-[32px]" />
            <Box>
              <Typography
                className="text-primary text-[15px]"
                style={{ fontWeight: "bold" }}>
                Overview of all Administrators
              </Typography>
              <Typography className="text-gray-400 -mt-0.5 text-[11px]">
                All current administrator
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="overflow-x-scroll  bg-white">
        <AdminTables />
      </Box>
    </Box>
  );
};

export default AdminPage;
