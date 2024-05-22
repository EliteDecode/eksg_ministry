import HeaderTitle from "@/components/dashboard/HeaderTitle";
import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import teachersImg from "../../assets/icons/results.png";
import { Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getGeneralAnalysis,
  getQuotaAnalysis,
  getTotalLgaSubjectAnalysis,
} from "@/features/students/studentSlice";
import { usePDF } from "react-to-pdf";
import Loader from "@/lib/Loader";
import Error from "@/lib/Error";
import TotalLgaSubjectAnalysisTable from "@/components/Tables/TotalLgaSubjectAnalysisTable";
import QuotaAnalysisTable from "@/components/Tables/QuotaAnalysisTable";
import { Button } from "@/components/ui/button";
import { useReactToPrint } from "react-to-print";

const GeneralAnalysis = () => {
  const { isLoading, quotaAnalysis, isError, generalAnalysis } = useSelector(
    (state) => state.Adminstudents
  );
  const dispatch = useDispatch();
  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  useEffect(() => {
    dispatch(getQuotaAnalysis());
    dispatch(getGeneralAnalysis());
  }, []);

  const { toPDF, targetRef } = usePDF({
    filename: `General_Analysis.pdf`,
  });

  return (
    <Box className="sm:p-5 space-y-4 p-3">
      <Box className="space-x-2">
        <Button
          onClick={() => {
            toPDF();
          }}>
          Download Analysis
        </Button>
        <Button onClick={handlePrint}>Print Analysis</Button>
      </Box>
      <Box ref={printRef}>
        <Box ref={targetRef}>
          <Box
            className={`w-[100%]  mt-5 bg-white sm:px-5 sm:py-4 p-3 rounded-md mb-5`}
            ref={targetRef}>
            <Box className="flex flex-wrap space-y-4 items-center justify-between">
              <Box className="flex items-center space-x-2">
                <img
                  src={teachersImg}
                  alt="dashboard icon"
                  className="w-[32px]"
                />
                <Box>
                  <Typography
                    className="text-primary text-[15px]"
                    style={{ fontWeight: "bold" }}>
                    General Registration Analysis
                  </Typography>
                  <Typography className="text-gray-400 -mt-0.5 text-[11px]">
                    OverView of registration analysis
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          {isLoading ? (
            <Loader />
          ) : (!isLoading && quotaAnalysis?.results?.length < 1) ||
            !quotaAnalysis ||
            isError ? (
            <Error />
          ) : (
            <Box className="border bg-white p-5 rounded-md">
              <Box className="">
                <Typography className="mb-2 font-bold uppercase text-yellow-900">
                  Registeration per Quota Given
                </Typography>
                <hr />
                <Typography className="mt-4 ">
                  Total Quota Given :{" "}
                  <span className="font-bold">
                    {quotaAnalysis?.totals?.total_quota_assigned?.toLocaleString()}
                  </span>
                </Typography>
                <Typography>
                  Total Registered Students :{" "}
                  <span className="font-bold">
                    {quotaAnalysis?.totals?.total_students_registered?.toLocaleString()}
                  </span>
                </Typography>
              </Box>

              <hr className="h-1 bg-gray-100 my-5" />

              <Box className="">
                <Typography className="mb-2 font-bold uppercase text-yellow-900">
                  Registeration per School Type
                </Typography>
                <hr />
                <Typography className="mt-4 ">
                  Total Registered Government School Students :{" "}
                  <span className="font-bold">
                    {generalAnalysis?.government_school_students_count?.toLocaleString()}
                  </span>
                </Typography>
                <Typography>
                  Total Registered Private School Students :{" "}
                  <span className="font-bold">
                    {generalAnalysis?.private_school_students_count?.toLocaleString()}
                  </span>
                </Typography>
              </Box>

              <hr className="h-1 bg-gray-100 my-5" />

              <Box className="">
                <Typography className="mb-2 font-bold uppercase text-yellow-900">
                  Registeration per Gender
                </Typography>
                <hr />
                <Typography className="mt-4 ">
                  Total Registered Male Students :{" "}
                  <span className="font-bold">
                    {generalAnalysis?.male_students_count?.toLocaleString()}
                  </span>
                </Typography>
                <Typography>
                  Total Registered Female Students :{" "}
                  <span className="font-bold">
                    {generalAnalysis?.female_students_count?.toLocaleString()}
                  </span>
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default GeneralAnalysis;
