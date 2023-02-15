import axios from "axios";

const instance = axios.create({
  baseURL: "https://flowsmm.net/api/",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const API = {
  async registration({ email, password }) {
    const { data } = await instance.post("auth/register", {
      email,
      password,
    });
    if (!data.success) throw new Error(data.msg);
    return data;
  },

  async login({ email, password }) {
    const { data } = await instance.post("auth/login", {
      email,
      password,
    });
    if (!data.success) throw new Error(data.msg);
    return data;
  },
};

export default API;
