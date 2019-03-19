import axios from "axios";


export default {

  // Miner routing
  getMiners: query => {
    console.log("getMiners: ", query);
    return axios.get(`api/minerRoutes/map/${query}`);
  },
  getAll: () => {
    console.log("get all of them");
    return axios.get("api/minerRoutes/");
  },
  post: query => {
    console.log("post: ", query);
    return axios.post(`api/minerRoutes/`, query);
  },
  put: query => {
    console.log("put: ", query);
    return axios.put("api/minerRoutes/", query);
  },
  delete: query => {
    console.log("delete: ", query);
    return axios.delete(`api/minerRoutes/${query}`);
  },

  // Map routing
  saveMap: query => {
    console.log("saveMap: ");
    console.log(query);
    return axios.post("api/mapRoutes", query);
  },
  findMap: query => {
    console.log("findMap: ");
    console.log(query);
    return axios.get(`api/mapRoutes/${query}`);
  }
};
