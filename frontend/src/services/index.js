import axios from "axios";
import store from "@/store"

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
let Podaci={
  async datumi(data){
    return await Service.post("/data",data);
  },
  async slika(data){
    return await Service.post("/slika",data);
  }
}
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
              store.state=user[0].admin;
                return user[0].admin
            }
            else{return null;}
        },
        get email(){
          let user=Auth.getUser();
          if(user){
            return user[0].email;
          }
        },
        get id(){
          let user=Auth.getUser();
          if(user){
            return user[0].id;
          }
        }
    }
}
export { Registracija, Auth, Podaci };