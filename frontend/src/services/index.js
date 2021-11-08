import axios from "axios";

let Service = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 1000,
});
let Registracija={
    async register(data) {
        return await Service.post("/register", data);
      },
      async log(data) {
        return await Service.post("/login", data);
        /*let user=response.data
        localStorage.setItem("user",JSON.stringify(user));
        return true*/
      }
}
export{Registracija}