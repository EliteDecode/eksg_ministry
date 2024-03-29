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
import teachersImg from "../../assets/icons/teachers-day.png";
import { Typography } from "antd";
import TeachersHeader from "@/components/dashboard/SchoolsHeader";
import { Button } from "@/components/ui/button";
import TeachersTables from "@/components/Tables/StudentsTables";
import { subjectsList } from "@/lib/utils";
import SchoolsHeader from "@/components/dashboard/SchoolsHeader";
const SchoolsPage = () => {
  const [class_taken, setClassTaken] = useState("JSS3");

  return (
    <Box className="sm:p-5 space-y-4 p-3">
      <SchoolsHeader />
      <Box
        className={`w-full mt-5 bg-white sm:px-5 sm:py-2 p-3 rounded-md mb-5`}>
        <Box className="flex flex-wrap space-y-4 items-center justify-between">
          <Box className="flex items-center space-x-2">
            <img src={teachersImg} alt="dashboard icon" className="w-[32px]" />
            <Box>
              <Typography
                className="text-primary text-[15px]"
                style={{ fontWeight: "bold" }}>
                Overview of all Schools
              </Typography>
              <Typography className="text-gray-400 -mt-0.5 text-[11px]">
                All current registered schools
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
                  onValueChange={(value) => setClassTaken(value)}
                  value={class_taken}>
                  <SelectTrigger className="sm:w-[230px] w-[100%] text-xs">
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
        <SchoolsTables class_taken={class_taken} />
      </Box>
    </Box>
  );
};

export default SchoolsPage;
