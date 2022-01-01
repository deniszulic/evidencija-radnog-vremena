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
  },
  async updatemydata(id,data){
    return await Service.patch(`/mydata/${id}`,data)
  },
  async lockdata(id,data){
    return await Service.patch(`/lock/${id}`,data)
  },
  async deletespecificdata(id){
    return await Service.delete(`delete/${id}`)
  }
}
let dohvatpodataka={
  async getdatauser(id){
    let response = await Service.get(`/getdata/${id}`);
    let data=response.data
    //console.log(data)
    return data
  },
  async getlockeddata(id){
    let response = await Service.get(`/locked/${id}`);
    let data=response.data
    return data
  },
  async getalldata(){
    let response = await Service.get('/alldata');
    let data=response.data
    return data
  },
  async getalldata1(){
    let response = await Service.get('/alldata1');
    let data=response.data
    return data
  },
  async getlockeddatabyemail(id){
    let response = await Service.get(`/alldatabyemail/${id}`);
    let data=response.data
    return data
  },
  async getlockeddatabyemail1(id){
    let response = await Service.get(`/alldatabyemail1/${id}`);
    let data=response.data
    return data
  },
  async getadminmydata(id){
    let response = await Service.get(`/getadmindata/${id}`);
    let data=response.data
    return data
  },
  async getstatisticdata(id){
    let response = await Service.get(`/statisticdata/${id}`);
    let data=response.data
    return data
  },
  async getlockeddatacheck(id){
    let response = await Service.get(`/lockeddata/${id}`);
    let data=response.data
    return data
  }
}
let azuriraj={
  async updateadmindata(id,data){
    return await Service.patch(`/updatemyadmindata/${id}`,data)
  },
  async updateadminpass(id,data){
    return await Service.patch(`/updatemyadminpass/${id}`,data)
  }
}
/*let deletedata={
  async deletepassword(id){
    return await Service.delete(`deletepassword/${id}`)
  }
}*/
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
        },
        get name(){
          let user=Auth.getUser();
          if(user){
            return user[0].ime;
          }
        },
        get surname(){
          let user=Auth.getUser();
          if(user){
            return user[0].prezime;
          }
        }
    }
}

export { Registracija, Auth, Podaci, dohvatpodataka, azuriraj };