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
    const { data } = await instance.post(url, body);
    if (!data.success) throw new Error(data.msg);
    return data;
  }

  async registration({ email, password }) {
    return await API.ajaxFun({ email, password }, "auth/register");
  }

  async login({ email, password }) {
    return await API.ajaxFun({ email, password }, "auth/login");
  }

  async recovery({ email }) {
    return await API.ajaxFun({ email }, "auth/recovery");
  }

  async reset(body) {
    return await API.ajaxFun(body, "auth/password-reset")
  }

  async update(body) {
    return await API.ajaxFun({...body, action: "updatePassword"}, "settings/update")
  }
}

export default new API();
