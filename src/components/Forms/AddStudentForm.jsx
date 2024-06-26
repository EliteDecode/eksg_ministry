import React, { useEffect, useState } from "react";
import { Box, Grid, IconButton, InputAdornment } from "@mui/material";
import { Typography } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import { Input } from "../ui/input";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// import { registerStudentSchema } from "@/lib/schemas";
import axios from "axios";
import { registerStudent, reset } from "@/features/students/studentSlice";
import passport from "../../assets/images/passport.png";
import { LGAS, nigerianStates } from "@/lib/generateContent";
import { registerStudentSchema } from "@/lib/schemas";

const AddStudentForm = () => {
  const {
    isLoading,
    isError,
    isSuccess,
    message,
    students,
    subjects: subjectApi,
  } = useSelector((state) => state.Adminstudents);

  const { lgaSchools, regStatus } = useSelector((state) => state.Adminschools);
  const [state, setState] = useState();
  const [profile, setProfile] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [schoolId, setSchoolId] = useState();

  const [loading, setLoading] = useState();
  const [localStore, setLocalStore] = useState([]);
  const [placementLga, setPlacementLGA] = useState();

  const [backgroundDetected, setBackgroundDetected] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const pixelData = ctx.getImageData(0, 0, 1, 1).data;
        const [red, green, blue] = pixelData;

        // Check if the background color is red
        if (red > 200 && green < 100 && blue < 100) {
          setBackgroundDetected(true);
          formik.setFieldValue("passportLocal", event.target.files[0]);
        } else {
          setBackgroundDetected(false);
          formik.setFieldValue("passportLocal", "");
        }
      };
      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  };

  let subjects = [];
  let totalStudents = [];

  let user;
  let exam_type_id = 2;

  if (exam_type_id == 1) {
    subjectApi?.[0].subjects?.map((item) => {
      subjects.push({
        id: item?.subject_id,
        name: item?.subject_name,
        compulsory: item?.is_compulsory == "1" ? true : false,
      });
    });
    totalStudents = students?.data?.CE?.total;
  } else if (exam_type_id == 2) {
    subjectApi?.[1].subjects?.map((item) => {
      subjects.push({
        id: item?.subject_id,
        name: item?.subject_name,
        compulsory: item?.is_compulsory == "1" ? true : false,
      });
    });
    totalStudents = students?.data?.JSS3?.total;
  } else {
    subjectApi?.[2].subjects?.map((item) => {
      subjects.push({
        id: item?.subject_id,
        name: item?.subject_name,
        compulsory: item?.is_compulsory == "1" ? true : false,
      });
    });
    totalStudents = students?.data?.SS2?.total;
  }
  const [subjectScores, setSubjectScores] = useState(
    subjects.map((subject) => ({
      subject_id: subject.id,
      ca1_score: "",
      ca2_score: "",
    }))
  );
  const [filteredSubjects, setFilteredSubjects] = useState(
    subjects.filter((sub) => !sub.compulsory)
  );

  const handleSelectChange = (index, value) => {
    const newScores = [...subjectScores];
    newScores[index].subject_id = value;
    setSubjectScores(newScores);

    const updatedFilteredSubjects = filteredSubjects.filter(
      (sub) => sub.id.toString() !== value.toString()
    );
    // console.log(updatedFilteredSubjects);
    // setFilteredSubjects(updatedFilteredSubjects);
  };

  useEffect(() => {
    const compulsorySubjects = subjectScores?.filter(
      (subject) =>
        subject.compulsory === true &&
        subject.ca1_score !== "" &&
        subject.ca2_score !== ""
    );

    if (compulsorySubjects.length >= 7) {
      const filteredSubjects = subjectScores?.filter(
        (subject) =>
          subject.ca1_score !== "" &&
          subject.ca2_score !== "" &&
          subject.ca1_score !== 0 &&
          subject.ca2_score !== 0
      );

      const checkFiltered = filteredSubjects.find(
        (subject) =>
          subject.ca1_score < 1 ||
          subject.ca1_score > 20 ||
          subject.ca2_score < 1 ||
          subject.ca2_score > 20
      );

      if (checkFiltered) {
        formik.setFieldValue("ca_scores", []);
      } else {
        formik.setFieldValue("ca_scores", filteredSubjects);
      }
    } else {
      formik.setFieldValue("ca_scores", []);
    }
  }, [subjectScores]);

  useEffect(() => {
    if (isSuccess && message === "student added successfully") {
      toast.success("Student Registered successfully", {
        onClose: () => {
          navigate(`/dashboard/schools/${schoolId}`);
          dispatch(reset());
        },
      });
    }

    if (isError) {
      toast.error(message, {
        onClose: () => {
          dispatch(reset());
        },
      });
    }

    if (isSuccess || isError) {
      dispatch(reset());
    }
  }, [isLoading, isError, isLoading, dispatch, message]);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      surname: "",
      othername: "",
      date_of_birth: "",
      state_of_origin: "",
      lga: "",
      exam_type_id: "",
      passportLocal: "",
      gender: "",
      school_id: "",
      school_lga: "",
      ca_scores: [],
    },
    validationSchema: registerStudentSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const formdata = new FormData();
      formdata.append("file", values.passportLocal);
      formdata.append("upload_preset", "qrvk52is");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dxtucu8tl/image/upload",
        formdata
      );

      if (response) {
        dispatch(
          registerStudent({
            ...values,
            passport: response?.data?.url,
            exam_type_id,
          })
        );

        console.log({ ...values, passport: response?.data?.url, exam_type_id });
        setLoading(false);
      }
    },
  });

  return (
    <Box className="">
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <img
            src={profile || passport}
            alt=""
            className="h-[120px] w-[110px] mt-1"
          />
          {backgroundDetected ? (
            <p className="text-[12px]" style={{ color: "green" }}>
              Background is red - Accepted
            </p>
          ) : (
            <p className="text-[12px]" style={{ color: "red" }}>
              Background color of passport MUST be red
            </p>
          )}

          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={6}>
              <Box className="mt-5 w-full">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Box className="">
                      <Label className="text-[11px]" htmlFor="firstname">
                        Firstname
                      </Label>
                      <Input
                        placeholder="e.g. Adekunle"
                        name="firstname"
                        value={formik.values.firstname}
                        onChange={formik.handleChange}
                        className="text-[12px]"
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.firstname && formik.errors.firstname ? (
                        <span
                          className="text-[10px] text-red-500 -mt-2 leading-none"
                          style={{ fontSize: "10px" }}>
                          (*) {formik.errors.firstname}
                        </span>
                      ) : null}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Box className="">
                      <Label className="text-[11px]" htmlFor="surname">
                        Surname
                      </Label>
                      <Input
                        placeholder="e.g. Kunle"
                        name="surname"
                        value={formik.values.surname}
                        onChange={formik.handleChange}
                        className="text-[12px]"
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.surname && formik.errors.surname ? (
                        <span
                          className="text-[10px] text-red-500 -mt-2 leading-none"
                          style={{ fontSize: "10px" }}>
                          (*) {formik.errors.surname}
                        </span>
                      ) : null}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Box className="">
                      <Label className="text-[11px]" htmlFor="othernames">
                        Other names
                      </Label>
                      <Input
                        placeholder="e.g. Ajayi"
                        name="othername"
                        value={formik.values.othername}
                        onChange={formik.handleChange}
                        className="text-[12px]"
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.othername && formik.errors.othername ? (
                        <span
                          className="text-[10px] text-red-500 -mt-2 leading-none"
                          style={{ fontSize: "10px" }}>
                          (*) {formik.errors.othername}
                        </span>
                      ) : null}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Box className="">
                      <Label className="text-[11px]" htmlFor="date_of_birth">
                        Date of Birth
                      </Label>
                      <Input
                        placeholder="e.g. Ajayi"
                        name="date_of_birth"
                        type="date"
                        value={formik.values.date_of_birth}
                        onChange={formik.handleChange}
                        className="text-[12px]"
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.date_of_birth &&
                      formik.errors.date_of_birth ? (
                        <span
                          className="text-[10px] text-red-500 -mt-2 leading-none"
                          style={{ fontSize: "10px" }}>
                          (*) {formik.errors.date_of_birth}
                        </span>
                      ) : null}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Box className="">
                      <Label className="text-[11px]" htmlFor="state_of_origin">
                        State of Origin
                      </Label>
                      <Select
                        name="state_of_origin"
                        onValueChange={(value) => {
                          formik.setFieldValue("state_of_origin", value);
                          setState(value);
                        }}
                        className="text-[12px]">
                        <SelectTrigger className="w-[100%] text-xs">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>State of Origin</SelectLabel>
                            {nigerianStates.map((item, index) => (
                              <SelectItem value={item} key={index}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {formik.touched.state_of_origin &&
                      formik.errors.state_of_origin ? (
                        <span
                          className="text-[10px] text-red-500 -mt-2 leading-none"
                          style={{ fontSize: "10px" }}>
                          (*) {formik.errors.state_of_origin}
                        </span>
                      ) : null}
                    </Box>
                  </Grid>
                  {state && (
                    <Grid item xs={12} sm={12} md={6}>
                      <Box className="">
                        <Label className="text-[11px]" htmlFor="lga">
                          Local Government Area
                        </Label>
                        <Select
                          name="lga"
                          onValueChange={(value) =>
                            formik.setFieldValue("lga", value)
                          }
                          className="text-[12px]">
                          <SelectTrigger className="w-[100%] text-xs">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>
                                Local Government of Origin
                              </SelectLabel>
                              {LGAS[state].map((item, index) => (
                                <SelectItem value={item} key={index}>
                                  {item}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {formik.touched.lga && formik.errors.lga ? (
                          <span
                            className="text-[10px] text-red-500 -mt-2 leading-none"
                            style={{ fontSize: "10px" }}>
                            (*) {formik.errors.lga}
                          </span>
                        ) : null}
                      </Box>
                    </Grid>
                  )}

                  <Grid item xs={12} sm={12} md={6}>
                    <Label className="text-[11px]" htmlFor="gender">
                      Gender
                    </Label>
                    <Select
                      name="gender"
                      onValueChange={(value) =>
                        formik.setFieldValue("gender", value)
                      }
                      className="text-[12px]">
                      <SelectTrigger className="w-[100%] text-xs">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Gender</SelectLabel>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {formik.touched.gender && formik.errors.gender ? (
                      <span
                        className="text-[10px] text-red-500 -mt-2 leading-none"
                        style={{ fontSize: "10px" }}>
                        (*) {formik.errors.gender}
                      </span>
                    ) : null}
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Label className="text-[11px]" htmlFor="lga">
                      Students Passport
                    </Label>
                    <Input
                      accept="image/*"
                      id="passportLocal"
                      name="passportLocal"
                      type="file"
                      onChange={(event) => {
                        handleImageUpload(event);
                        // Display the chosen picture beneath the form
                        setProfile(
                          URL.createObjectURL(event.currentTarget.files[0])
                        );
                      }}
                      onClick={(event) => {
                        event.target.value = null; // Reset the input value on click to allow reselection of the same file
                      }}
                    />

                    {formik.touched.passportLocal &&
                    formik.errors.passportLocal ? (
                      <span
                        className="text-[10px] text-red-500 -mt-2 leading-none"
                        style={{ fontSize: "10px" }}>
                        (*) {formik.errors.passportLocal}
                      </span>
                    ) : null}
                  </Grid>
                  {exam_type_id == 2 && (
                    <>
                      <Grid item xs={12} sm={12} md={6}>
                        <Box className="">
                          <Label className="text-[11px]" htmlFor="school_lga">
                            LGA of School
                          </Label>
                          <Select
                            name="school_lga"
                            onValueChange={(value) => {
                              formik.setFieldValue("school_lga", value);
                              setPlacementLGA(value);
                            }}
                            className="text-[12px]">
                            <SelectTrigger className="w-[100%] text-xs">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>School LGA</SelectLabel>
                                {lgaSchools.map((item, index) => (
                                  <SelectItem value={item.name} key={index}>
                                    {item.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          {formik.touched.school_lga &&
                          formik.errors.school_lga ? (
                            <span
                              className="text-[10px] text-red-500 -mt-2 leading-none"
                              style={{ fontSize: "10px" }}>
                              (*) {formik.errors.school_lga}
                            </span>
                          ) : null}
                        </Box>
                      </Grid>
                      {placementLga && (
                        <Grid item xs={12} sm={12} md={6}>
                          <Box className="">
                            <Label className="text-[11px]" htmlFor="school_id">
                              Students School
                            </Label>
                            <Select
                              name="school_id"
                              onValueChange={(value) => {
                                formik.setFieldValue("school_id", value);
                                setSchoolId(value);
                              }}
                              className="text-[12px]">
                              <SelectTrigger className="w-[100%] text-xs">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel> Students School</SelectLabel>
                                  {lgaSchools
                                    .filter(
                                      (item) => item.name === placementLga
                                    ) // Filter schools based on chosen name
                                    ?.map((item) =>
                                      item.schools.map((school, index) => (
                                        <SelectItem
                                          value={school.school_id.toString()}
                                          key={index}>
                                          {school.name}
                                        </SelectItem>
                                      ))
                                    )}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            {formik.touched.school_id &&
                            formik.errors.school_id ? (
                              <span
                                className="text-[10px] text-red-500 -mt-2 leading-none"
                                style={{ fontSize: "10px" }}>
                                (*) {formik.errors.school_id}
                              </span>
                            ) : null}
                          </Box>
                        </Grid>
                      )}
                    </>
                  )}
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box className="">
                <Typography variant="subtitle1" gutterBottom>
                  Test Scores
                </Typography>
                {formik.touched.ca_scores && formik.errors.ca_scores ? (
                  <span
                    className="text-[10px] text-red-500 -mt-2 leading-none"
                    style={{ fontSize: "10px" }}>
                    (*) {formik.errors.ca_scores}
                  </span>
                ) : null}
                <Box>
                  {subjectScores
                    .slice(0, user?.exam_type_id == "3" ? 9 : 14)
                    .map((score, index) => {
                      const isCompulsory = subjects.find(
                        (subject) => subject.id === score.subject_id
                      );

                      return (
                        <Box className="flex items-center space-x-2">
                          <Box>
                            <Label
                              className="text-[11px]"
                              htmlFor={`ca2_score_${index}`}>
                              Subjects
                            </Label>

                            {isCompulsory?.compulsory ? (
                              <Input
                                placeholder={isCompulsory?.name}
                                value={score.name}
                                className="w-[150px] text-xs"
                                readOnly
                              />
                            ) : (
                              <Select
                                name="status"
                                value={score.subject_id}
                                onValueChange={(value) =>
                                  handleSelectChange(index, value)
                                }
                                className="text-[12px]">
                                <SelectTrigger className="w-[150px] text-xs">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Classes</SelectLabel>
                                    {filteredSubjects.map((subject) => (
                                      <SelectItem
                                        key={subject.id}
                                        value={subject.id.toString()}>
                                        {subject.name}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            )}
                          </Box>

                          <Box>
                            <Label
                              className="text-[11px]"
                              htmlFor={`ca1_score_${index}`}>
                              CA1
                            </Label>
                            <Input
                              placeholder="Enter CA1 score"
                              name={`ca1_score_${index}`}
                              value={score.ca1_score}
                              onChange={(e) => {
                                const inputValue =
                                  parseInt(e.target.value) || 0;
                                const newScores = [...subjectScores];
                                newScores[index].ca1_score = inputValue;
                                setSubjectScores(newScores);
                              }}
                              className="text-[12px] sm:w-[150px] w-[100%]"
                            />
                          </Box>
                          <Box>
                            <Label
                              className="text-[11px]"
                              htmlFor={`ca2_score_${index}`}>
                              CA2
                            </Label>

                            <Input
                              placeholder="Enter CA2 score"
                              name={`ca2_score_${index}`}
                              value={score.ca2_score}
                              onChange={(e) => {
                                const inputValue =
                                  parseInt(e.target.value) || 0;
                                const newScores = [...subjectScores];
                                newScores[index].ca2_score = inputValue;
                                setSubjectScores(newScores);
                              }}
                              className="text-[12px] sm:w-[150px] w-[100%]"
                            />
                          </Box>
                        </Box>
                      );
                    })}
                </Box>
              </Box>
            </Grid>
          </Grid>
          {regStatus?.is_registration_active ? (
            <Box className="flex justify-end space-x-2 mt-10">
              <Button
                type=""
                disabled={loading || isLoading}
                onClick={formik.handleSubmit}>
                {loading || isLoading ? "Please wait..." : " Register Student"}
              </Button>
            </Box>
          ) : regStatus?.is_registration_active === false ? (
            <Box className="flex justify-end p-5 mt-10 bg-red-800 rounded-md ">
              <Typography className="text-white">
                <span className="text-white-800">(*)</span> Registeration is
                currenly closed
              </Typography>
            </Box>
          ) : (
            ""
          )}
        </form>
      </Box>
    </Box>
  );
};

export default AddStudentForm;
