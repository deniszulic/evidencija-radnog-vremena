<template>
  <!--<div>-->
  <!--<table class="table table-striped">
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
          <th scope="row">1</th>-->
  <!--<td>Veljača</td>-->
  <!--<td>{{podaci.datum_obavljanja_pocetak|moment}}</td>
          <td>{{podaci.br_sati}}</td>
          <td>
            <button
              type="button"
              class="btn btn-success"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Detalji
            </button>
          </td>
        </tr>-->
  <!--<tr>
          <th scope="row">2</th>
          <td>Ožujsko</td>
          <td>11</td>
          <td>
            <button
              type="button"
              class="btn btn-success"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Potpiši
            </button>
          </td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Travanj</td>
          <td>233</td>
          <td>
            <button type="button" class="disabled btn btn-dark">
              Potpisano
            </button>
          </td>
        </tr>-->
  <!--</tbody>
    </table>-->
  <!--<th scope="row">1</th>-->

  <!--<div v-if="showtable==false">
          <tr >
          <td>{{podaci}}</td>
          <td>
            <button
              type="button"
              class="btn btn-success"
              data-toggle="modal"
              data-target="#exampleModal" @click="anothertable(podaci)"
            >
              Detalji
            </button>
          </td></tr></div>
          <div v-if="showtable==true">
          <tr>
          <td>cyka</td>
          <td>
            <button
              type="button"
              class="btn btn-success"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              hmm da
            </button>
          </td></tr></div>-->
  <div>
    <tr v-for="data in podaci" :key="data.id">
      <!--<button @click="back()">Natrag</button>-->

      <!--<td>Joe</td>
      <td>Bama</td>-->
      <td></td>
      <td>
        {{ moment(data.datum_obavljanja_pocetak).format("YYYY MMMM") }}
      </td>

      <!--<td>{{podaci.datum_obavljanja_pocetak}}</td>-->
      <td>{{ moment(data.datum_obavljanja_kraj).format("YYYY MMMM") }}</td>
      <td>{{ data.br_sati }}</td>
      <td>{{ data.prekovremeni }}</td>
      <td>{{ data.rad_od_kuce }}</td>
      <td>{{ data.odsutan }}</td>
      <td>{{ data.nocni_rad }}</td>
      <td>{{ data.blagdan }}</td>
      <td>{{ data.napomena }}</td>
      <td><button @click="update(data)">Ažuriraj podatke</button></td>
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
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
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
            Datum obavljanja početak:{{moment(datump).format('DD MM YYYY')}}<br>
            <input
              type="date"
              v-model="datump"
            /><br /><br>Datum obavljanja kraj:
            {{moment(datumk).format('DD MM YYYY')}}<br><input
              type="date"
              v-model="datumk"
            /><br />Broj sati:<input
              type="text"
              v-model="brsati"
            /><br />Prekovremeni:<input
              type="text"
              v-model="prekovremeni"
            /><br />Rad od kuće:<input
              type="text"
              v-model="rad_od_kuce"
            /><br />Odsutan:<input type="text" v-model="odsutan" /><br />Noćni
            rad:<input type="text" v-model="nocni_rad" /><br />Blagdan:<input
              type="text"
              v-model="blagdan"
            /><br />Napomena:<textarea v-model="napomena" />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="close()"
            >
              Close
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              @click="savechanges()"
            >
              Save changes
            </button>
          </div>
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
    };
  },
  methods: {
    show(podaci) {
      moment.locale("hr");
      //console.log(podaci)
      //console.log(moment(this.store.podaci.datum_obavljanja_pocetak).format('YYYY MMMM'))
      //if(podaci==moment(this.store.podaci.datum_obavljanja_pocetak).format('YYYY MMMM')){
      for (let i = 0; i < this.store.podaci.length; i++) {
        //console.log(this.store.podaci[i].datum_obavljanja_pocetak)
        if (
          podaci ==
          moment(this.store.podaci[i].datum_obavljanja_pocetak).format(
            "YYYY MMMM"
          )
        ) {
          //console.log(this.store.podaci[i].datum_obavljanja_pocetak)
          //this.store.datum_obavljanja_pocetak[i]=this.store.podaci[i].datum_obavljanja_pocetak
          //this.store.filter=[]
          this.store.filter.push(this.store.podaci[i]);
          $("#exampleModal").modal("show");
        }
      }
    },
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
    update(data) {
      this.id = data.id;
      this.datump = data.datum_obavljanja_pocetak;
      this.datumk = data.datum_obavljanja_kraj;
      (this.brsati = data.br_sati), (this.prekovremeni = data.prekovremeni);
      this.rad_od_kuce = data.rad_od_kuce;
      this.odsutan = data.odsutan;
      this.nocni_rad = data.nocni_rad;
      this.blagdan = data.blagdan;
      this.napomena = data.napomena;
      $("#exampleModal").modal("show");
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
            }
          }
        })
    },
  },
};
</script>