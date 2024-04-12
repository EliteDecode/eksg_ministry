import React, { useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import { Box, Grid } from "@mui/material";
import { Typography } from "antd";

import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Loader from "@/lib/Loader";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSingleStudents,
  getSingleStudent,
} from "@/features/students/studentSlice";
import { toast } from "react-toastify";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const SingleStudentPage = () => {
  const dispatch = useDispatch();
  const { studentId } = useParams();
  const { singleStudents, isError, isSuccess, isLoading, message, subjects } =
    useSelector((state) => state.Adminstudents);

  const [loading, setLoading] = useState(false);

  const { singleSchool } = useSelector((state) => state.Adminschools);
  const handleedit = () => {
    navigate(`/dashboard/edit-student/${studentId}`, {
      state: {
        student: singleStudents,
      },
    });
  };

  const handleDelete = async () => {
    setLoading(true);
    dispatch(deleteSingleStudents(studentId));
  };

  useEffect(() => {
    dispatch(getSingleStudent(studentId));
  }, []);

  const studentDetails = [
    {
      title: "Firstname",
      value: singleStudents?.firstname,
    },
    {
      title: "Lastname/Surname",
      value: singleStudents?.surname,
    },
    {
      title: "Othernames",
      value: singleStudents?.othername,
    },

    {
      title: "Student Pin",
      value: singleStudents?.pin,
    },
    {
      title: "Gender",
      value: singleStudents?.gender,
    },
    {
      title: "State of Origin",
      value: singleStudents?.state_of_origin,
    },
    {
      title: "LGA",
      value: singleStudents?.local_government,
    },
    {
      title: "Date of Birth",
      value: new Date(singleStudents?.date_of_birth).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      ),
    },
    {
      title: "Registered At",
      value: singleStudents?.created_at
        ? new Date(singleStudents?.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "Data is still Offline",
    },
  ];

  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess && message == "deleted") {
      toast.info("Student data deleted successfully", {
        onClose: () => {
          navigate("/dashboard/students");
          setLoading(false);
        },
      });
    }
  }, [isSuccess, isError, isLoading, message]);

  const scores = singleStudents?.scores?.filter(
    (item) => item.ca1_score !== 0 && item.ca2_score !== 0
  );

  return (
    <Box className="p-4">
      <Box
        className={`w-full mt-5 bg-white sm:px-5 sm:py-5 p-3 rounded-md mb-5`}>
        <Box className="flex flex-wrap justify-between space-y-4 ">
          <Box className="bg-white my-3 rounded-md p-1.5 shadow-md sm:w-[15%] w-[50%] ">
            <img
              src={singleStudents?.passport}
              alt="student Image"
              className="rounded-md"
            />
          </Box>
          <Box className="space-x-2">
            <Button onClick={handleedit}>Edit Student Info</Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">Delete student data</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Delete Student data</DialogTitle>
                  <DialogDescription>
                    You are about to delete this student data
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                  <Button
                    type="submit"
                    variant="destructive"
                    disabled={loading || isLoading}
                    onClick={handleDelete}>
                    {loading ? "Please wait..." : "Proceed"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Box>
        </Box>
      </Box>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Box className="mt-5">
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12} md={6} className="space-y-4">
                <Box className="bg-white rounded-md p-5 space-y-4">
                  <Box className="flex  items-center justify-between space-x-2">
                    <Typography className="font-bold text-[14px] text-[#000]">
                      School Name:
                    </Typography>
                    <Typography>{singleStudents?.school_name}</Typography>
                  </Box>
                  <Box className="flex  items-center justify-between space-x-2">
                    <Typography className="font-bold text-[14px] text-[#000]">
                      School Code:
                    </Typography>
                    <Typography>{singleStudents?.school_code}</Typography>
                  </Box>
                  <Box className="flex  items-center justify-between space-x-2">
                    <Typography className="font-bold text-[14px] text-[#000]">
                      School LGA:
                    </Typography>
                    <Typography>{singleStudents?.school_lga}</Typography>
                  </Box>
                </Box>
                <Box className="bg-white rounded-md p-5 ">
                  <Box>
                    <Box className="space-y-4">
                      {studentDetails.map((item, index) => (
                        <Box
                          key={index}
                          className="flex  items-center justify-between space-x-2">
                          <Typography className="font-bold text-[14px] text-[#000]">
                            {item.title}:
                          </Typography>
                          <Typography>{item.value}</Typography>
                        </Box>
                      ))}
                      {studentDetails?.student_code != null && (
                        <Box className="flex  items-center justify-between space-x-2">
                          <Typography className="font-bold text-[14px] text-[#000]">
                            Student Exam Number
                          </Typography>
                          <Typography>
                            {studentDetails?.student_code}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Box className="bg-white rounded-md p-5 overflow-x-scroll">
                  <Box>
                    <Box className="space-y-4">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr className="text-center">
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Subject
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              CA1 Score
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              CA2 Score
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {scores?.map((item, index) => {
                            return (
                              <tr key={index} className="hover:bg-gray-100">
                                <td className="px-6 py-4 text-left whitespace-nowrap">
                                  {item.subject_name}
                                </td>
                                <td className="px-6 py-4 text-center whitespace-nowrap">
                                  {item.ca1_score}
                                </td>
                                <td className="px-6 py-4 text-center whitespace-nowrap">
                                  {item.ca2_score}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );
};

export default SingleStudentPage;
