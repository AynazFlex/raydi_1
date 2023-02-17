import axios from "axios";

const instance = axios.create({
  baseURL: "https://flowsmm.net/api/",
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});

class API {
  static async ajaxFun(body, url) {
    const { data } = await instance.post(`auth/${url}`, body);
    if (!data.success) throw new Error(data.msg);
    return data;
  }

  async registration({ email, password }) {
    return await API.ajaxFun({ email, password }, "register");
  }

  async login({ email, password }) {
    return await API.ajaxFun({ email, password }, "login");
  }

  async recovery({ email }) {
    return await API.ajaxFun({ email }, "recovery");
  }
}

export default new API();
