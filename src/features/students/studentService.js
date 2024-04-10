import axios from "axios";

const API_URL = "https://api.eksexams.com/api";

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

  console.log(response.data);

  return response.data;
};
const deleteSingleStudents = async (token, studentId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    `${API_URL}/student/${studentId}`,
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

const getTotalLgaSubjectAnalysis = async (token, exam_type) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}/subjects/total-lga-analysis/${exam_type}`,
    config
  );

  if (response.data) {
    localStorage.setItem("total_lga_analysis", JSON.stringify(response.data));
  }

  return response.data;
};

const getSingleLgaSubjectAnalysis = async (token, lgaId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}/subjects/lga-analysis/${lgaId}`,
    config
  );

  if (response.data) {
    localStorage.setItem("single_lga_analysis", JSON.stringify(response.data));
  }

  return response.data;
};

const getSingleSchoolSubjectAnalysis = async (token, schoolId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}/subjects/school-analysis/${schoolId}`,
    config
  );

  if (response.data) {
    localStorage.setItem(
      "single_school_analysis",
      JSON.stringify(response.data)
    );
  }

  return response.data;
};

const getQuotaAnalysis = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/quota-analysis`, config);

  if (response.data) {
    localStorage.setItem("quota_analysis", JSON.stringify(response.data));
  }

  return response.data;
};

const authService = {
  getAllStudents,
  getSingleStudent,
  getAllSubjects,
  registerStudent,
  getSingleLgaSubjectAnalysis,
  updateSingleStudents,
  deleteSingleStudents,
  getTotalLgaSubjectAnalysis,
  getSingleSchoolSubjectAnalysis,
  getQuotaAnalysis,
};

export default authService;
