import axios from "axios";
var MockAdapter = require("axios-mock-adapter");

const mock = new MockAdapter(axios);
mock.onAny().reply((config) => {
  if (Math.random() < 0.5) return [200, config.data];
  return [500, {}];
});

export default axios;
