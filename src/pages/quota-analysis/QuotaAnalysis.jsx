import HeaderTitle from "@/components/dashboard/HeaderTitle";
import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import teachersImg from "../../assets/icons/results.png";
import { Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
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

const QuotaAnalysis = () => {
  const { isLoading, quotaAnalysis, isError } = useSelector(
    (state) => state.Adminstudents
  );
  const dispatch = useDispatch();
  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  useEffect(() => {
    dispatch(getQuotaAnalysis());
  }, []);

  const { toPDF, targetRef } = usePDF({
    filename: `quotaAnalysis.pdf`,
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
                    Quota/Registration Analysis
                  </Typography>
                  <Typography className="text-gray-400 -mt-0.5 text-[11px]">
                    OverView of quota/registration analysis by LGAs
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
            <Box className="overflow-x-scroll w-[90%] m-auto ">
              <QuotaAnalysisTable />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default QuotaAnalysis;
