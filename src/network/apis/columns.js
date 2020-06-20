import { axiosInstance } from "./index";

const getColumns = async () => {
  return await axiosInstance.get(`columns`, { handlerEnabled: true });
};

export default {
  getColumns
};