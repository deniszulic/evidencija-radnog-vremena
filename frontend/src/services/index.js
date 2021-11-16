import axios from "axios";

let Service = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 1000,
});

let Registracija = {
  async register(data) {
    return await Service.post("/register", data);
  },
  async log(data) {
    let response= await Service.post("/login", data);
    let user=response.data
    localStorage.setItem("user",JSON.stringify(user))
    /*let user=response.data
        localStorage.setItem("user",JSON.stringify(user));
        return true*/
  },
};
let Auth={
    getUser(){
        return JSON.parse(localStorage.getItem("user"))
    },
    logout(){
        localStorage.removeItem('user');
    },
    state:{
        get admin(){
            let user=Auth.getUser();
            if(user){
                return user[0].admin
            }
        }
    }
}
export { Registracija, Auth };