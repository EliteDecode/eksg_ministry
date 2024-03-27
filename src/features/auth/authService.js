import axios from "axios";

const API_URL = "https://eksgexams.purplebeetech.com/api";

const logout = async () => {
  localStorage.removeItem("Adminuser");
  localStorage.removeItem("Adminschools");
  localStorage.removeItem("Adminstudents");
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/super-admin/login`, userData);

  if (response.data) {
    localStorage.setItem("Adminuser", JSON.stringify(response.data));
  }
  return response.data;
};

const registerAdmin = async (token, userData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}/user`, userData, config);

  return response.data;
};

const updateAdmin = async (token, userData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${API_URL}/user/${userData.id}`,
    userData,
    config
  );

  return response.data;
};

const getAdmins = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/users`, config);

  return response.data;
};

const authService = {
  logout,
  login,
  getAdmins,
  registerAdmin,
  updateAdmin,
};

export default authService;
