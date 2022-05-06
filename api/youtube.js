import axios from "axios";

const KEY = "AIzaSyAKIC2sBxDKqowGOCAp0yi4WW1oWVl_z_U";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: 15,
    key: KEY
  },
  headers: {}
});
