import axios from "axios";

let Service = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 1000,
});
let Registracija={
    async register(data) {
        return await Service.post("/register", data);
      }
}
export{Registracija}