import { Box } from "@mui/material";
import { Typography } from "antd";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "../ui/button";
import { Link, useParams } from "react-router-dom";
import { EditSchoolForm } from "../Forms/EditSchoolForm";
import { useDispatch, useSelector } from "react-redux";
import { updateSchool } from "@/features/schools/schoolSlice";

const HeaderTitle = ({
  img,
  title,
  subtitle,
  BtnText,
  BtnText2,
  BtnTextType,
  BtnTextType2,
  route,
}) => {
  const { singleSchool, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.Adminschools
  );

  const dispatch = useDispatch();
  const { schoolId } = useParams();
  const handleDeactivate = () => {
    dispatch(updateSchool({ is_active: 0, schoolId }));
  };
  const handleActivate = () => {
    dispatch(updateSchool({ is_active: 1, schoolId }));
  };
  return (
    <>
      <Box
        className={`w-full
       bg-white sm:p-5 p-3 rounded-md mb-5`}>
        <Box className="flex flex-wrap space-y-4 items-center justify-between">
          <Box className="flex items-center space-x-2">
            <img src={img} alt="dashboard icon" className="w-[32px]" />
            <Box>
              <Typography
                className="text-primary text-[15px]"
                style={{ fontWeight: "bold" }}>
                {title}
              </Typography>
              <Typography className="text-gray-400 -mt-0.5 text-[11px]">
                {subtitle}
              </Typography>
            </Box>
          </Box>
          <Box className="space-x-4">
            <EditSchoolForm />

            {singleSchool?.is_active == "1" ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant={BtnTextType ? BtnTextType : "default"}>
                    {BtnText}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader className="text-center">
                    <AlertDialogTitle>Confirm Deactivation</AlertDialogTitle>
                    <AlertDialogDescription>
                      You are about to deactivate this school from accessing the
                      platform. This will not delete their file or account from
                      the system. Do you still want to proceed?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeactivate}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="" className="bg-teal-700">
                    Activate School
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader className="text-center">
                    <AlertDialogTitle>Confirm Activation</AlertDialogTitle>
                    <AlertDialogDescription>
                      You are about to activate Adventist Comprehensive High Do
                      you still want to proceed?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleActivate}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HeaderTitle;
