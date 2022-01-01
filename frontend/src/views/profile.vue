<template>
<div id="app" v-if="store.state==false">
<div class="container">

<div class="jumbotron">
  <h1 class="display-4">Profil</h1>
  <hr>
</div>
<div class="container">
  <div class="row">
    <div class="col-sm">
      <br>
      <img src="https://i.ibb.co/zmBCGtv/logo.png" alt="logo" width="350" height="100">
      <!-- zamjeniti sa slikom profila uwu -->
      <br><br>
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
      <!-- <h3>Ime: {{ime}}</h3>
      <p>Prezime: {{prezime}}</p>
      <p>Email: {{email}}</p> -->
    </div>
    
    <div class="col-sm">
      <h2>Status:</h2>
      <p>Ukupno mjeseci: {{month.length}}</p>
      <div class="form-group">
    <label for="changepass">Promijeni šifru</label><br>
    <input type="password" class="form-control" id="changepass" aria-describedby="changepass" placeholder="Nova lozinka" v-model="changepassword" >
  </div>
  <button type="button" class="btn btn-primary" @click="updatepassword()">Spremi novu lozinku</button>
    </div>
  </div>
<hr>
 <!--<mojioglasi :podaci="data" v-for="data in podaci" :key="data.id"/>-->
<table class="table table-bordered" >
  <thead v-if="!store.open">
        <tr>
          <th scope="col">Kalendar</th>
        </tr>
      </thead> 
      <tbody v-if="store.open">
        <mojioglasi :podaci="filtered" />        
      </tbody>     
      <tbody v-if="!store.open">
        <tr v-for="(data,index) in month" :key="data.id" >
          
         <td class="col-md-1">{{index+1}}. </td>
         <td>{{data}}</td>
          <td class="col-md-3" style="text-align:center;">
            <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal" @click="show(data)"
            >
              Detalji
            </button>
          </td>

          <td class="col-md-2">
            <b>Status:  Unsolved</b> <!-- div v-if za rjeseno/nerjeseno -->
          </td>

        </tr>
      </tbody>

    </table>
</div>

  </div>

  </div>



</template>

<script>

import { Calendar, DatePicker } from 'v-calendar';
import {azuriraj} from '@/services'
import {dohvatpodataka} from '@/services'
import {Auth} from '@/services'
import mojioglasi from "@/components/mojioglasi.vue"
import moment from "moment";
import store from '@/store.js'

export default {
  name:"profile",
  components: {
    Calendar,
    DatePicker,
    mojioglasi
  },
  data() {
  return {
    // ime:Auth.state.name,
    // prezime:Auth.state.surname,
    // email:Auth.state.email,
    store,
    //totalmonths:null,
    filtered:[],
    datumreg:'',
    open:false,
    mydata:[],
    ime:'',
    prezime:'',
    changepassword:''
  }
},
/*async mounted(){
  this.podaci=await dohvatpodataka.getdatauser(Auth.state.id)
}*/
created(){
  this.fetchData(),
  this.fetchmydata()
},
watch: {
    // call again the method if the route changes
    '$route': 'fetchData',
    '$route': 'fetchmyData'
  },
  methods:{
    async fetchData(){
      this.store.podaci=await dohvatpodataka.getdatauser(Auth.state.id)
      //console.log(this.podaci)
    },
    async fetchmydata(){
      this.mydata=await dohvatpodataka.getadminmydata(Auth.state.id)
      this.ime=this.mydata[0].ime
        this.prezime=this.mydata[0].prezime
        this.datumreg=moment(parseInt(this.mydata[0].datumreg)).format("DD.MM.YYYY")
    },
    async updatedata(){
          let update={
              ime:this.ime,
              prezime:this.prezime
          }
          await azuriraj.updateadmindata(Auth.state.id, update)
      },
    onFileChange(e){
      const selected=e.target.files[0];
      this.img=selected;
    },
    back() {
      this.store.open=false;
    },
   show(data){
      this.store.open=true

     //RADI BEZ DA SE DUPLA!!!
     moment.locale("hr")
     let a=this.store.podaci.filter(element=>moment(element.datum_obavljanja_pocetak).format('MMMM YYYY')==data)
     this.filtered=a.map(obj=>({...obj}))
   },
   async updatepassword(){
          //await deletedata.deletepassword(Auth.state.id)
         //console.log("pass:"+this.changepassword)
          let update={
              lozinka:this.changepassword
          }
          await azuriraj.updateadminpass(Auth.state.id, update).then(()=>{
            this.changepassword=''
          })
      }
  },
  computed:{
    month:function(){
    moment.locale("hr")
   return [...new Set(this.store.podaci.map(data=>moment(data.datum_obavljanja_pocetak).format('MMMM YYYY')))]
  }
}}

</script>


<style>

h2 {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  display:inline-block;
  margin: 40px 8px 10px 8px; 
  color: #cccccc;
}

</style>