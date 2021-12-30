<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-sm">
            <!-- <form @submit.prevent="updatedata"> -->
                
      <h1>Promijeni svoje podatke</h1>
  <div class="form-group">
    <label for="exampleInputname">Ime</label><br>
    <input type="text" class="form-control" id="exampleInputname" aria-describedby="name" placeholder="Ime" v-model="ime">
  </div>
  <div class="form-group">
    <label for="surname">Prezime</label><br>
    <input type="text" class="form-control" id="surname" aria-describedby="surname" placeholder="Prezime" v-model="prezime">
  </div>
  <div class="form-group">
    <label for="dateregistration">Datum registracije</label><br>
    <input type="text" class="form-control" id="dateregistration" aria-describedby="dateregistration" placeholder="Datum registracije" v-model="datumreg" disabled>
  </div>
  <button type="button" class="btn btn-primary" @click="updatedata()">Spremi promjene</button>

  
  <div class="form-group">
    <label for="changepass">Promijeni šifru</label><br>
    <input type="password" class="form-control" id="changepass" aria-describedby="changepass" placeholder="Nova lozinka" v-model="changepassword" >
  </div>
  <button type="button" class="btn btn-primary" @click="updatepassword()">Spremi novu lozinku</button>
<!-- </form> -->
        </div>
        <div class="col-sm">
            <h1>Dodaj admina</h1>
            <form @submit.prevent="addadmin">
                <div class="form-group">
    <label for="exampleInputname1">Ime</label><br>
    <input type="text" class="form-control" id="exampleInputname1" aria-describedby="name1" placeholder="Ime" v-model="ime1">
  </div>
  <div class="form-group">
    <label for="surname1">Prezime</label><br>
    <input type="text" class="form-control" id="surname1" aria-describedby="surname1" placeholder="Prezime" v-model="prezime1">
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Email</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
  </div>
  <button type="submit" class="btn btn-primary">Dodaj</button>
</form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {dohvatpodataka} from '@/services'
import {azuriraj} from '@/services'
import {Auth} from '@/services'
import moment from 'moment'
import {Registracija} from "@/services";
//import {deletedata} from "@/services";
export default {
  name: "adminprofil",
  data() {
    return {
        adminmydata:[],
        ime:'',
        prezime:'',
        datumreg:'',
        email:'',
        password:'',
        errorMessage1:'',
        ime1:'',
        prezime1:'',
        changepassword:''
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData",
  },
  methods:{
      async fetchData(){
        this.adminmydata=await dohvatpodataka.getadminmydata(Auth.state.id)
        this.ime=this.adminmydata[0].ime
        this.prezime=this.adminmydata[0].prezime
        this.datumreg=moment(parseInt(this.adminmydata[0].datumreg)).format("DD.MM.YYYY")
    },
      async updatedata(){
          let update={
              ime:this.ime,
              prezime:this.prezime
          }
          await azuriraj.updateadmindata(Auth.state.id, update)
      },
      async addadmin(){
          let a={
        ime:this.ime1,
        prezime:this.prezime1,
        email:this.email,
        lozinka:this.password.toString(),
        admin:true,
        datumReg: Date.now()
      }
      try{
      await Registracija.register(a).then(()=>{
          this.ime1=''
          this.prezime1=''
          this.email=''
          this.password=''
      })
      }
      catch (error) {
        this.errorMessage1 = error.message;
        console.log("Greška");
      }
      },
      async updatepassword(){
          //await deletedata.deletepassword(Auth.state.id)
          console.log("pass:"+this.changepassword)
          let update={
              lozinka:this.changepassword
          }
          await azuriraj.updateadminpass(Auth.state.id, update)
      }
  }
};
</script>