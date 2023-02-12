import axios from "axios";

const instance = axios.create({
  baseURL: "https://flowsmm.net/api/",
  withCredentials: true,
});

const API = {
  async registration({ email, password }) {
    const { data } = await instance.post("auth/register", {
      email,
      password,
    });
    console.log(data)
    return data;
  },
};

export default API;
