<template>
<div>
          <div class="container table-bordered">
            <thead class="thead-dark"  v-if="store.open">
        <tr>
          <th scope="col"><button type="button" class="btn btn-dark" style="margin-right: 10px;" @click="back()">Natrag</button></th>
          <th scope="col">Datum početak</th>
          <th scope="col">Datum kraj</th>
          <th scope="col" >Broj sati</th>
          <th scope="col">Prekovremeni</th>
          <th scope="col">Rad od kuće</th>
          <th scope="col">Odsutan</th>
          <th scope="col">Noćni rad</th>
          <th scope="col">Blagdan</th>
          <th scope="col">Napomena</th>
        </tr>
      </thead>
    <tr v-for="data in podaci" :key="data.id" class="table-bordered" style="text-align:center;">
      <!--<button @click="back()">Natrag</button>-->

      <!--<td>Joe</td>
      <td>Bama</td>-->
      <td></td>
      <td>
        {{ moment(data.datum_obavljanja_pocetak).format("DD MMMM YYYY") }}
      </td>

      <td>{{ moment(data.datum_obavljanja_kraj).format("DD MMMM YYYY") }}</td>
      <td>{{ data.br_sati }}</td>
      <td>{{ data.prekovremeni }}</td>
      <td>{{ data.rad_od_kuce }}</td>
      <td>{{ data.odsutan }}</td>
      <td>{{ data.nocni_rad }}</td>
      <td>{{ data.blagdan }}</td>
      <td>{{ data.napomena }}</td>
      <td><button type="button" class="btn btn-warning"  @click="update(data)">Ažuriraj podatke</button></td>
      <td><button @click="getdata(data)" class="btn btn-success" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasWithBothOptions"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
</svg></button>
</td>
    </tr>
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Uređivanje</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="close()"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Datum obavljanja početak:<br>
            <input
              type="date"
              v-model="datump"
            /><br /><br>Datum obavljanja kraj:<br><input
              type="date"
              v-model="datumk"
            /><br />Broj sati:<input
              type="text"
              v-model="brsati"
            /><br />Prekovremeni:<input
              type="text"
              v-model="prekovremeni"
            /><br />Rad od kuće:
            <select v-model="rad_od_kuce" id="inputState" class="form-control" >
        <option>DA</option>
        <option>NE</option>
      </select>
           <!-- <input
              type="text"
              v-model="rad_od_kuce"
            />--><br />Odsutan:<input type="text" v-model="odsutan" /><br />Noćni
            rad:<input type="text" v-model="nocni_rad" /><br />Blagdan:<input
              type="text"
              v-model="blagdan"
            /><br />Napomena:<textarea class="form-control" v-model="napomena" />
            <img id="image" class="img-thumbnail" :src="pic"/>
             </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="close()"
            >
              Zatvori
            </button>
            <button
              type="submit"
              class="btn btn-success"
              @click="savechanges()"
            >
              Spremi
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
  <div class="offcanvas-header">
    <h5 id="offcanvasRightLabel">Zaključaj datume</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <div class="p-3 border bg-light">
        Broj sati:{{brsati}} <br>
        Datumi: <b>{{datump}}</b> - <b>{{datumk}}</b><br>
        Prekovremeni: {{prekovremeni}}<br>
        Rad vikendom/blagdanom: {{blagdan}}<br>
        Nocni rad: {{nocni_rad}}<br>
        odsutan: {{odsutan}}<br>
        od kuce: {{rad_od_kuce}}<br>
        Napomena: {{napomena}}<br>
        <br></div>
        <div class="p-3 border bg-light">
        <p>Potpis:</p><img id="image1" class="img-thumbnail" :src="pic"/><br>
         <!-- <input type="file" name="pic" />   -->
        <br><br></div><i>Provjeriti podatke prije zaključavanja!</i><br>
        <button class="btn btn-success" @click="lock()">Zaključaj</button>
  </div>
</div>


    </div>

</div>
  <!--</div>-->
</template>
<script>
import moment from "moment";
import store from "@/store.js";
import secondtable from "../components/secondtable.vue";
import {Podaci} from '@/services'
export default {
  props: ["podaci"],
  filters: {
    moment: function (date) {
      return moment(date).format("MMMM");
    },
  },
  data() {
    return {
      store,
      showtable: false,
      moment,
      datump: "",
      datumk: "",
      brsati: "",
      prekovremeni: "",
      rad_od_kuce: "",
      odsutan: "",
      nocni_rad: "",
      blagdan: "",
      napomena: "",
      id: "",
      pic:""
    };
  },
  methods: {
    back() {
      //location.reload();
      this.store.open = false;
      //this.$el.parentNode.removeChild(this.$el);
      //this.$router.push({name:"profile"})
      //this.$destroy();
      //this.$root.$el.parentNode.removeChild(this.$root.$el)
    },
    anothertable(podaci) {
      this.showtable = true;
    },
encode (input) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    while (i < input.length) {
        chr1 = input[i++];
        chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index 
        chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                  keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }
    return output;
},
    update(data) {
      this.id = data.id;
      this.datump = new Date(data.datum_obavljanja_pocetak).toISOString().slice(0,10);
      this.datumk = new Date(data.datum_obavljanja_kraj).toISOString().slice(0,10);
      (this.brsati = data.br_sati), (this.prekovremeni = data.prekovremeni);
      this.rad_od_kuce = data.rad_od_kuce;
      this.odsutan = data.odsutan;
      this.nocni_rad = data.nocni_rad;
      this.blagdan = data.blagdan;
      this.napomena = data.napomena;
if(data.img!=null){
var arrayBuffer = data.img.__ob__.value.data;
    var bytes = new Uint8Array(arrayBuffer);

    var image = document.getElementById('image');
    image.src = 'data:image/png;base64,'+this.encode(bytes);}
    else{this.pic=""}
      $("#exampleModal").modal("show");
    },
    getdata(data){
      this.id = data.id;
      this.datump = new Date(data.datum_obavljanja_pocetak).toISOString().slice(0,10);
      this.datumk = new Date(data.datum_obavljanja_kraj).toISOString().slice(0,10);
      (this.brsati = data.br_sati), (this.prekovremeni = data.prekovremeni);
      this.rad_od_kuce = data.rad_od_kuce;
      this.odsutan = data.odsutan;
      this.nocni_rad = data.nocni_rad;
      this.blagdan = data.blagdan;
      this.napomena = data.napomena;
      if(data.img!=null){
        var arrayBuffer = data.img.__ob__.value.data;
        var bytes = new Uint8Array(arrayBuffer);

        var image = document.getElementById('image1');
        image.src = 'data:image/png;base64,'+this.encode(bytes);}
    else{this.pic=""}
    },
    close() {
      this.id = "";
      $("#exampleModal").modal("hide");
    },
    async savechanges() {
        let update={
          datum_obavljanja_pocetak:this.datump,
          datum_obavljanja_kraj:this.datumk,
          br_sati:this.brsati,
          prekovremeni:this.prekovremeni,
          odsutan:this.odsutan,
          rad_od_kuce:this.rad_od_kuce,
          nocni_rad:this.nocni_rad,
          napomena:this.napomena,
          blagdan:this.blagdan
        }
        await Podaci.updatemydata(this.id,update).then(()=>{
          //alert("Uspješno")
          for(let [i,x] of this.store.podaci.entries()){
            if(x.id==this.id){
              x.datum_obavljanja_pocetak=update.datum_obavljanja_pocetak
              x.datum_obavljanja_kraj=update.datum_obavljanja_kraj
              x.br_sati=update.br_sati
              x.prekovremeni=update.prekovremeni
              x.odsutan=update.odsutan
              x.rad_od_kuce=update.rad_od_kuce
              x.nocni_rad=update.nocni_rad
              x.napomena=update.napomena
              x.blagdan=update.blagdan
              break;
            }
          }
          for(let [i,x] of this.podaci.entries()){
            if(x.id==this.id){
              x.datum_obavljanja_pocetak=update.datum_obavljanja_pocetak
              x.datum_obavljanja_kraj=update.datum_obavljanja_kraj
              x.br_sati=update.br_sati
              x.prekovremeni=update.prekovremeni
              x.odsutan=update.odsutan
              x.rad_od_kuce=update.rad_od_kuce
              x.nocni_rad=update.nocni_rad
              x.napomena=update.napomena
              x.blagdan=update.blagdan
              break;
            }
          }
        }).then(()=>$("#exampleModal").modal("hide"))
    },
    async lock(){
      let data={
        zakljucano:true
      }
      await Podaci.lockdata(this.id, data).then(()=>{
        $("#offcanvasRight").offcanvas("hide");
        
        for (let i =0; i < this.store.podaci.length; i++)
   if (this.store.podaci[i].id == this.id) {
      this.store.podaci.splice(i,1);
      break;
   }
   for (let i =0; i < this.store.podaci.length; i++)
   if (this.podaci[i].id == this.id) {
      this.podaci.splice(i,1);
      break;
   }
      })
      this.$router.push({name:"zakljucano"})
    }
  },
};
</script>

<style scoped>

</style>