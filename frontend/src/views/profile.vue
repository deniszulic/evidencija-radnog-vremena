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
      <h3>Ime: {{ime}}</h3>
      <p>Prezime: {{prezime}}</p>
      <p>Email: {{email}}</p>
    </div>
    
    <div class="col-sm">
      <h2>Status:</h2>
      <p><i>Ukupno potpisano:</i></p>
      <p>Nerješeno: 3</p>
      <p>Ukupno GO: 11</p>{{month}}
    </div>
  </div>
<hr>
 <!--<mojioglasi :podaci="data" v-for="data in podaci" :key="data.id"/>-->
<table class="table table-striped" >
      <thead>
        <tr>
          <!--<th scope="col">#</th>-->
          <th scope="col">Godina i mjesec</th>
          <!--<th scope="col">Ukupno sati</th>
          <th scope="col"></th>-->
        </tr>
      </thead>
      <!--<tbody  v-for="data in month" :key="data">
        <tr>-->
          <!--<th scope="row">1</th>-->
         <!-- <td>{{data}}</td>
          <td>
            <button
              type="button"
              class="btn btn-success"
              data-toggle="modal"
              data-target="#exampleModal" @click="show()"
            >
              Detalji
            </button>
          </td>
        </tr>
      </tbody>-->
      <mojioglasi :podaci="data" v-for="data in month" :key="data.id"/>
    </table>
</div>

<!--
{{currentDate}}

  <DatePicker v-model="range" is-range />-->
  </div>


<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" >
        <!--ID:{{data.id}} <br/>Datum pocetak:{{data.datum_obavljanja_pocetak}}<br/> Datum Kraj:{{data.datum_obavljanja_kraj}}-->
       <!-- <input type="file" name="pic" @change="onFileChange"/>-->
       {{store.filter}}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="close()">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
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
    filtered:[]
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
    close(){
      $("#exampleModal").modal("hide");
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