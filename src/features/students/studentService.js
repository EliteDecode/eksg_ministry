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

const getSingleStudent = async (token, studentId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/student/${studentId}`, config);

  return response.data;
};

const authService = {
  getAllStudents,
  getSingleStudent,
};

export default authService;
