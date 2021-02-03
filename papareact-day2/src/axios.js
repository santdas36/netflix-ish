import axios from 'axios';

const instance = new axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default instance;