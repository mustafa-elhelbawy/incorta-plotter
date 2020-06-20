import { axiosInstance } from "./index";

const getChartData = async (data) => {
  return await axiosInstance.post(`data`, data, { handlerEnabled: true });
};

export default {
  getChartData
};