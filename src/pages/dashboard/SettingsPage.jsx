import HeaderTitle from "@/components/dashboard/HeaderTitle";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import teachersImg from "../../assets/icons/settings-gears.png";
import { Typography, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  closeRegisteration,
  getRegStatus,
  reset,
} from "@/features/schools/schoolSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const { regStatus, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.Adminschools
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    dispatch(closeRegisteration({ is_active: false }));
  };
  const handleOpen = () => {
    dispatch(closeRegisteration({ is_active: true }));
  };

  useEffect(() => {
    if (isSuccess && message == "Registration status updated successfully") {
      toast.success("Registration Status Updated Successfully", {
        onClose: () => {
          navigate("/");
          dispatch(reset());
        },
      });
    }
    if (isError) {
      toast.error(message);
    }
  }, [isError, isSuccess, message]);

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
                Settings
              </Typography>
              <Typography className="text-gray-400 -mt-0.5 text-[11px]">
                Make all authorized changes from here
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      {regStatus?.is_registration_active ? (
        <Box className="overflow-x-scroll p-5 bg-white sm:w-[30%] space-y-4 w-[100%]">
          <Typography className="text-gray-500 text-[14px]">
            <span className="text-red-500">(*)</span> When registration is
            closed, schools will no longer have the ability to add new students
            or make changes to their registered student records.
          </Typography>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">Close Registerations</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Close Registeration</DialogTitle>
                <DialogDescription>
                  You are about to close the portal for all registerations
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <Button
                  type="submit"
                  disabled={isLoading}
                  onClick={handleClose}>
                  {isLoading ? "Please wait..." : "Close Registeration"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Box>
      ) : (
        <Box className="overflow-x-scroll p-5 bg-white sm:w-[30%] space-y-4 w-[100%]">
          <Typography className="text-gray-500 text-[14px]">
            <span className="text-red-500">(*)</span> When registration is
            opened, schools will be able to to add new students and make changes
            to their registered student records.
          </Typography>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="" className="bg-teal-600">
                Open Registerations
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Open Registeration</DialogTitle>
                <DialogDescription>
                  You are about to open the portal for all registerations
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <Button type="submit" disabled={isLoading} onClick={handleOpen}>
                  {isLoading ? "Please wait..." : "Open Registeration"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Box>
      )}
    </Box>
  );
};

export default SettingsPage;
