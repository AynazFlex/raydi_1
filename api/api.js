import axios from "axios";

const instance = axios.create({
  baseURL: "https://flowsmm.net/api/",
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});

class API {
  static async post(body, url) {
    const { data } = await instance.post(url, body);
    if (!data.success) throw new Error(data.msg);
    return data;
  }

  static async get(url) {
    const { data } = await instance.get(url);
    if (!data.success) throw new Error(data.msg || 'ошибка загрузки');
    return data;
  }

  async registration({ email, password }) {
    return await API.post({ email, password }, "auth/register");
  }

  async login({ email, password }) {
    return await API.post({ email, password }, "auth/login");
  }

  async recovery({ email }) {
    return await API.post({ email }, "auth/recovery");
  }

  async reset(body) {
    return await API.post(body, "auth/password-reset")
  }

  async update(body) {
    return await API.post({...body, action: "updatePassword"}, "settings/update")
  }

  async ordersCreate(body) {
    return await API.post(body, "orders/create")
  }

  async ordersCheckout(body) {
    return await API.post(body, "orders/checkout")
  }

  async ordersHistory() {
    return await API.get("orders/history")
  }

  async balanceTopUp(body) {
    return await API.post(body, "balance/top-up")
  }

  async balanceHistory() {
    return await API.get("balance/history")
  }
}

export default new API();
