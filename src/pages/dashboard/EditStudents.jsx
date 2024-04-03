import React, { useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import HeaderTitle from "@/components/dashboard/HeaderTitle";
import schoolImg from "../../assets/icons/education.png";
import { Box, Grid } from "@mui/material";

import { Link, useLocation, useParams } from "react-router-dom";

import EditStudentForm from "@/components/Forms/EditStudentForm";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/lib/Loader";
import { getSingleStudent } from "@/features/students/studentSlice";

const EditStudents = () => {
  const { studentId } = useParams();
  const dispatch = useDispatch();
  const { singleStudents, isError, isSuccess, isLoading, subjects } =
    useSelector((state) => state.Adminstudents);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getSingleStudent(studentId));
    setLoading(true);
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [isSuccess, isError]);

  return (
    <Box className="sm:p-5 space-y-4 p-3">
      <Box role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            to="/dashboard/schools"
            className="hover:underline"
            style={{ fontSize: "14px" }}>
            Student Registeration
          </Link>

          <Link
            className="hover:underline"
            aria-current="page"
            style={{ fontSize: "14px" }}>
            Edit student
          </Link>
        </Breadcrumbs>
      </Box>
      {loading ? (
        <Loader />
      ) : (
        <Box className="mt-5">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={12}>
              <Box className="bg-white rounded-md p-5 ">
                <Box>
                  <EditStudentForm />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default EditStudents;
