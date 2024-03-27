import axios from "axios";

const API_URL = "https://eksgexams.purplebeetech.com/api";

const getAllSchools = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/sorted-schools`, config);

  if (response.data) {
    localStorage.setItem("Adminschools", JSON.stringify(response.data));
  }

  return response.data;
};

const getSingleSchool = async (token, schoolId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/school/${schoolId}`, config);

  return response.data;
};

const addSchool = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}/schools`, data, config);

  return response.data;
};

const updateSchool = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log(data);

  const response = await axios.put(
    `${API_URL}/school/${data.schoolId}`,
    data,
    config
  );

  return response.data;
};

const closeRegisteration = async (token, status) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}/toggle-reg`, status, config);

  return response.data;
};

const getRegStatus = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/reg-status`, config);

  if (response.data) {
    localStorage.setItem("reg-status", JSON.stringify(response.data));
  }

  return response.data;
};

const authService = {
  getAllSchools,
  closeRegisteration,
  getSingleSchool,
  addSchool,
  updateSchool,
  getRegStatus,
};

export default authService;
