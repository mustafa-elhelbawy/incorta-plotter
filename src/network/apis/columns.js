import { axiosInstance } from "./index";
const handlerEnabled = false;

const getColumns = async () => {
  return await axiosInstance.get(`columns`, { handlerEnabled });
};

export default {
  getColumns
};