import HeaderTitle from "@/components/dashboard/HeaderTitle";
import { Box } from "@mui/material";
import React, { useState } from "react";
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
import teachersImg from "../../assets/icons/student.png";
import { Typography } from "antd";
import TeachersHeader from "@/components/dashboard/SchoolsHeader";
import { Button } from "@/components/ui/button";
import { subjectsList } from "@/lib/utils";
import SchoolsHeader from "@/components/dashboard/SchoolsHeader";
import StudentsTables from "@/components/Tables/StudentsTables";
import { useSelector } from "react-redux";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";
const StudentsPage = () => {
  const [class_taken, setClassTaken] = useState("JSS3");
  const [subject_taken, setSubjectTaken] = useState("");
  const { students, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.Adminstudents
  );

  const filteredStudents =
    class_taken == "CE"
      ? students?.data?.CE?.students
      : class_taken == "JSS3"
      ? students?.data?.JSS3?.students
      : students?.data?.SS2?.students;

  console.log();

  return (
    <Box className="sm:p-5 space-y-4 p-3">
      <Box className="flex space-x-2 sm:justify-end justify-left items-center ">
        <Link to="/dashboard/students/add-student">
          <Button
            variant="default"
            className="border-primary"
            size="sm"
            icon={<Add />}>
            Add New Student
          </Button>
        </Link>
      </Box>
      <Box
        className={`w-full mt-5 bg-white sm:px-5 sm:py-2 p-3 rounded-md mb-5`}>
        <Box className="flex flex-wrap space-y-4 items-center justify-between">
          <Box className="flex items-center space-x-2">
            <img src={teachersImg} alt="dashboard icon" className="w-[32px]" />
            <Box>
              <Typography
                className="text-primary text-[15px]"
                style={{ fontWeight: "bold" }}>
                Overview of all Students
              </Typography>
              <Typography className="text-gray-400 -mt-0.5 text-[11px]">
                All current registered students
              </Typography>
            </Box>
          </Box>
          <Box>
            <Box className="flex flex-wrap justify-center items-center space-x-1">
              <Box>
                <Typography className="text-[10px] font-semibold uppercase">
                  Select Class
                </Typography>
                <Select
                  value={class_taken}
                  onValueChange={(value) => setClassTaken(value)}>
                  <SelectTrigger className="w-[200px] text-xs">
                    <SelectValue placeholder="Select " />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Classes</SelectLabel>
                      {/* <SelectItem value="CE">Common Entrance</SelectItem> */}
                      <SelectItem value="JSS3">JSS3</SelectItem>
                      {/* <SelectItem value="SS2">SS2</SelectItem> */}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="overflow-x-scroll  bg-white">
        <StudentsTables filteredStudents={filteredStudents} />
      </Box>
    </Box>
  );
};

export default StudentsPage;
