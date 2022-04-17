import axios, { AxiosInstance } from "axios";
var MockAdapter = require("axios-mock-adapter");

const BASE_URL = "ec2-107-22-119-188.compute-1.amazonaws.com";

class Axios {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL,
    });
  }

  refreshRequestHandler(token: string) {
    this.instance = axios.create({
      baseURL: BASE_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

// This sets the mock adapter on the default instance
export const mock = new MockAdapter(axios);
export default new Axios();
