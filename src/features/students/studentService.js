import axios from "axios";

const API_URL = "https://eksgexams.purplebeetech.com/api";

const getAllStudents = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/sorted-students`, config);

  if (response.data) {
    localStorage.setItem("Adminstudents", JSON.stringify(response.data));
  }

  return response.data;
};

const registerStudent = async (token, studentData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${API_URL}/admin/students`,
    studentData,
    config
  );
  console.log(response.data);
  return response.data;
};

const updateSingleStudents = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${API_URL}/student/${data?.studentId}`,
    data,
    config
  );

  return response.data;
};

const getSingleStudent = async (token, studentId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/student/${studentId}`, config);

  return response.data;
};
const getAllSubjects = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/sorted-subjects`, config);

  if (response.data) {
    localStorage.setItem("eksg_subjects", JSON.stringify(response.data));
  }

  return response.data;
};

const authService = {
  getAllStudents,
  getSingleStudent,
  getAllSubjects,
  registerStudent,
  updateSingleStudents,
};

export default authService;
