<template>
<div id="app">
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
      <h3>Ime: {{ime}}</h3>
      <p>Prezime: {{prezime}}</p>
      <p>Email: {{email}}</p>
    </div>
    
    <div class="col-sm">
      <h2>Status:</h2>
      <p><i>Ukupno potpisano:</i> 33</p>
      <p>Nerješeno: 3</p>
      <p>Ukupno GO: 11</p>{{month}}
    </div>
  </div>
<hr>
 <!--<mojioglasi :podaci="data" v-for="data in podaci" :key="data.id"/>-->
<table class="table table-striped" >
  <thead v-if="store.open">
        <tr>
          <th scope="col"><button type="button" class="btn btn-dark" @click="back()">Natrag</button></th>
          <th scope="col">Datum početak</th>
          <th scope="col">Datum kraj</th>
          <th scope="col">Broj sati</th>
          <th scope="col">Prekovremeni</th>
          <th scope="col">Rad od kuće</th>
          <th scope="col">Odsutan</th>
          <th scope="col">Noćni rad</th>
          <th scope="col">Blagdan</th>
          <th scope="col">Napomena</th>
        </tr>
      </thead>
      <!-- <tbody v-if="store.open">-->
        <mojioglasi :podaci="filtered" />        
      <!--</tbody>-->
      <thead v-if="!store.open">
        <tr>
          <th scope="col">Kalendar</th>
        </tr>
      </thead>
     
      <tbody v-if="!store.open">
        <tr v-for="data in month" :key="data.id">
         <td>{{data}}</td>
          <td>
            <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal" @click="show(data)"
            >
              Detalji
            </button>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-success"
              data-toggle="modal"
              data-target="#confirmmodal" @click="confirmmodal(data)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
</svg>
            </button>
          </td>
        </tr>
      </tbody><!--</div>-->
     <!-- <tbody>
        <mojioglasi :podaci="data" v-for="data in month" :key="data.id"/>
      </tbody>-->
    </table>
</div>

<!--
{{currentDate}}

  <DatePicker v-model="range" is-range />-->
  </div>


<!-- Modal -->
<div class="modal fade" id="confirmmodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Potpisivanje</h5>
        <button type="button" class="close" data-dismiss="modal" @click="close()" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Broj sati: <br>
        Mjesec: <br>
        Prekovremeni: <br>
        Napomena: <br>
<br><hr>
        Upload potpisa:
        <input type="file" name="pic" @change="onFileChange"/>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="close()">Close</button>
        <button type="button" class="btn btn-primary">Pošalji</button>
      </div>
    </div>
  </div>
</div>

  </div>



</template>

<script>

import { Calendar, DatePicker } from 'v-calendar';
import {dohvatpodataka} from '@/services'
import {Auth} from '@/services'
import mojioglasi from "@/components/mojioglasi.vue"
import moment from "moment";
import Mojioglasi from '../components/mojioglasi.vue';
import store from '@/store.js'

export default {
  name:"profile",
  components: {
    Calendar,
    DatePicker,
    mojioglasi
  },
  data() {
    Mojioglasi
  return {
    ime:Auth.state.name,
    prezime:Auth.state.surname,
    email:Auth.state.email,
    store,
    filtered:[],
    open:false
  }
},
/*async mounted(){
  this.podaci=await dohvatpodataka.getdatauser(Auth.state.id)
}*/
created(){
  this.fetchData()
},
watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  methods:{
    async fetchData(){
      this.store.podaci=await dohvatpodataka.getdatauser(Auth.state.id)
      //console.log(this.podaci)
    },
    onFileChange(e){
      const selected=e.target.files[0];
      this.img=selected;
    },
    back() {
      this.store.open=false;
    },
    /*show(data){
      moment.locale("hr")
      $("#exampleModal").modal("show");
      //console.log(this.month)
      /*if(moment(data.datum_obavljanja_pocetak).format('YYYY MMMM')==this.month){
        this.filtered=this.podaci
      }*/
      /*for(let i=0;i<this.podaci.length;i++){
        console.log(this.month)
        let datum=moment(this.podaci[i].datum_obavljanja_pocetak).format('YYYY MMMM')
        console.log(datum)
        if((datum==this.month[0])){
          //this.filtered=this.podaci
          this.filtered.concat(this.podaci)
          //console.log("aaa")
        }
      }
    },*/
    /*show(data){
      $("#exampleModal").modal("show");
      /*for(let i=0;i<this.podaci.length;i++){
        moment(this.podaci[i].datum_obavljanja_pocetak).format('YYYY MMMM').find(this.month)
      }*/
   // },
   show(data){
     //$("#exampleModal").modal("show");
     /*Radi ali se duplaju podaci obv
     for(let i=0;i<this.store.podaci.length;i++){
       if(moment(this.store.podaci[i].datum_obavljanja_pocetak).format('YYYY MMMM')==data){
         this.filtered.push(this.store.podaci[i])
       }
     }*/
      this.store.open=true

     //RADI BEZ DA SE DUPLA!!!
     moment.locale("hr")
     let a=this.store.podaci.filter(element=>moment(element.datum_obavljanja_pocetak).format('YYYY MMMM')==data)
     this.filtered=a.map(obj=>({...obj}))
   },
   confirmmodal(data){
     $("#confirmmodal").modal("show");
   },
    close(){
      $("#exampleModal").modal("hide");
      $("#confirmmodal").modal("hide");

      this.store.filter=[]
    }
  },
  computed:{
    month:function(){
      //for(let i=0;i<this.podaci.length;i++){
        /*if(this.podaci[i].datum_obavljanja_pocetak.getMonth==this.podaci[i].datum_obavljanja_kraj.getMonth){
          console.log(this.podaci[i].datum_obavljanja_pocetak.getMonth)
        }*/
        /*console.log(moment(this.podaci[i].datum_obavljanja_pocetak).format('MMMM'))
      }*/
      /*return this.podaci.filter(item=>{
        return moment(item.datum_obavljanja_pocetak).format('MMMM')
      })
    }*/
    //return [...new Set(this.podaci.map(x=>x.moment(x.datum_obavljanja_pocetak).format('MMMM')))]
    moment.locale("hr")
   return [...new Set(this.store.podaci.map(data=>moment(data.datum_obavljanja_pocetak).format('YYYY MMMM')))]
  }
}}

//
// These are required files we must include these libraries 

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