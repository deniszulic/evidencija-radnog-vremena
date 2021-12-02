<template>

<tbody v-if="store.open">
    <tr v-for="data in podaci" :key="data.id">
      <td></td>
      <td>
        {{ moment(data.datum_obavljanja_pocetak).format("YYYY MMMM") }}
      </td>

      <!--<td>{{podaci.datum_obavljanja_pocetak}}</td>-->
      <td>{{ moment(data.datum_obavljanja_kraj).format("YYYY MMMM") }} - {{moment(datump).format("YYYY MMMM")}}</td>
      <td>{{ data.br_sati }}</td>
      <td>{{ data.prekovremeni }}</td>
      <td>{{ data.rad_od_kuce }}</td>
      <td>{{ data.odsutan }}</td>
      <td>{{ data.nocni_rad }}</td>
      <td>{{ data.blagdan }}</td>
      <td>{{ data.napomena }}</td>
      
      <td><button type="button" class="btn btn-primary" @click="update(data)">Ažuriraj podatke</button></td>
    </tr>

    </tbody>

    </template>

<script>
import moment from "moment";
import store from "@/store.js";
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
          moment(this.store.podaci[i].datum_obavljanja_pocetak).format("DD-MM-YYYY")
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
