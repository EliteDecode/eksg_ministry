import HeaderTitle from "@/components/dashboard/HeaderTitle";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

import teachersImg from "../../assets/icons/results.png";
import { Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleLgaSubjectAnalysis,
  getTotalLgaSubjectAnalysis,
} from "@/features/students/studentSlice";
import Loader from "@/lib/Loader";
import Error from "@/lib/Error";

import { useParams } from "react-router-dom";
import SingleLgaSubjectAnalysisTable from "@/components/Tables/SingleLgaSubjectAnalysisTable";

const SingleLgaSubjectAnalysis = () => {
  const { isLoading, singleLgaSubjectAnalysis } = useSelector(
    (state) => state.Adminstudents
  );
  const dispatch = useDispatch();
  const { lgaId } = useParams();

  useEffect(() => {
    dispatch(getSingleLgaSubjectAnalysis(lgaId));
  }, []);

  return (
    <Box className="sm:p-5 space-y-4 p-3">
      <Box
        className={`sm:w-[30%] w-full mt-5 bg-white sm:px-5 sm:py-4 p-3 rounded-md mb-5`}>
        <Box className="flex flex-wrap space-y-4 items-center justify-between">
          <Box className="flex items-center space-x-2">
            <img src={teachersImg} alt="dashboard icon" className="w-[32px]" />
            <Box>
              <Typography
                className="text-primary text-[15px]"
                style={{ fontWeight: "bold" }}>
                Subject Analysis
              </Typography>
              <Typography className="text-gray-400 -mt-0.5 text-[11px]">
                OverView of subjects taken by Students
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      {isLoading ? (
        <Loader />
      ) : !isLoading && !singleLgaSubjectAnalysis ? (
        <Error />
      ) : (
        <Box className="overflow-x-scroll  ">
          <SingleLgaSubjectAnalysisTable />
        </Box>
      )}
    </Box>
  );
};

export default SingleLgaSubjectAnalysis;
