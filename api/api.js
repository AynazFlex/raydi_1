import axios from "axios";

const instance = axios.create({
  baseURL: "https://flowsmm.net/api/",
});

const API = {
  async registration({ email, password }) {
    console.log(email, password);
    const { data } = await instance.post("auth/register", {
      email,
      password,
    });
    if(!data.success) throw new Error(data.msg)
    return data;
  },
};

export default API;
