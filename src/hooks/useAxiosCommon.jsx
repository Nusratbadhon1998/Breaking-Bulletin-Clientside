import axios from "axios";

export const axiosCommon = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});
function useAxiosCommon() {
  return axiosCommon;
}

export default useAxiosCommon;
