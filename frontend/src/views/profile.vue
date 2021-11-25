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
      <h3>Ime: {{podaci}}</h3>
      <p>Prezime: </p>
      <p>Email: </p>
    </div>
    
    <div class="col-sm">
      <h2>Status:</h2>
      <p><i>Ukupno potpisano: {{suma}}</i></p>
      <p>Nerješeno: 3</p>
      <p>Ukupno GO: 11</p>
    </div>
  </div>
<hr>
  <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Mjesec</th>
      <th scope="col">Ukupno sati</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Veljača</td>
      <td>122</td>
      <td><button type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModal">Potpiši</button></td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Ožujsko</td>
      <td>11</td>
      <td><button type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModal">Potpiši</button></td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Travanj</td>
      <td>233</td>
      <td><button type="button" class="disabled btn btn-dark">Potpisano</button></td>
    </tr>
  </tbody>
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
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Upload potpisa: 
        <input type="file" name="pic" @change="onFileChange"/>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

  </div>



</template>

<script>

import { Calendar, DatePicker } from 'v-calendar';
import {Podaci} from '@/services'
import {Auth} from '@/services'

export default {
  name:"calendar",
  components: {
    Calendar,
    DatePicker
  },
  methods: {
    onFileChange(e){
      const selected=e.target.files[0];
      this.img=selected;
    },
    currentDate() {
      const current = new Date();
      /*const date = current.getFullYear()+'-'+(current.getMonth()+1)+'-'+current.getDate();
      const time = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
      const dateTime = date +' '+ time;
      
      return dateTime;*/
      return current.getMonth;
    },
    /*async slika(){
      const fd=new FormData();
      return await fd.append('image',this.img,this.img.name)
    },*/
    async kalendar(){
      const fd=new FormData();
      if(this.img!=null){
        console.log("prvi")
        let podaci={
          br_sati:this.brsati,
          prekovremeni:this.prekovremeni,
          blagdan:this.blagdan,
          nocni_rad:this.nocni,
          odsutan:this.odsutan,
          rad_od_kuce:this.posaoodkuce,
          napomena:this.napomena,
          datum_obavljanja_pocetak:this.range.start,
          datum_obavljanja_kraj:this.range.end,
          email:Auth.state.email,
          korisnik_id:Auth.state.id,
          postavljeno:Date.now()
        }
        let id=await Podaci.datumi(podaci);
        if(id.data!=null){
          console.log("treci")
          console.log(id)
          fd.append('image',this.img,id.data)
          await Podaci.slika(fd)
        }
      }
      else{
        console.log("drugi")
        let podaci={
          br_sati:this.brsati,
          prekovremeni:this.prekovremeni,
          blagdan:this.blagdan,
          nocni_rad:this.nocni,
          odsutan:this.odsutan,
          rad_od_kuce:this.posaoodkuce,
          napomena:this.napomena,
          datum_obavljanja_pocetak:this.range.start,
          datum_obavljanja_kraj:this.range.end,
          email:Auth.state.email,
          korisnik_id:Auth.state.id,
          postavljeno:Date.now()
        }
        await Podaci.datumi(podaci);
      }
    }
  },
  data() {
  return {
    brsati:null,
    prekovremeni:null,
    blagdan:null,
    nocni:null,
    odsutan:null,
    posaoodkuce:null,
    napomena:null,
    img:null,
    image:null,
    //suma:null,
    range: {
      //start:this.currentDate() /*this.currentDate()*/,
      //end:'' /*this.currentDate()*/,
      start: new Date(),
      end: new Date()
    }
  }
},
computed:{
  suma:function(){
    //if(this.brsati>0||this.prekovremeni>0||this.blagdan>0||this.nocni>0||this.odsutan>0){
     // if(isNaN(this.brsati))
      return this.brsati+this.prekovremeni+this.blagdan+this.nocni-this.odsutan
    //}
  },
  formattedDateStart() {
      return moment(this.range.start).format('DD-MM-YYYY')// dan,mjesec, godina
    },
    formattedDateEnd() {
      return moment(this.range.end).format('DD-MM-YYYY')
    },
  provjera:function(){
    if(this.napomena=="") return this.napomena=null;
  }
}
  /*mounted () {
      this.currentDate()
    }*//*,
    watch:{
      range
    }*/
}

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