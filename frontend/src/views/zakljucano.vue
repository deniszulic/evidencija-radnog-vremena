<template>
  <div>
    <div class="jumbotron">
  <h1 class="display-4">Zaključano</h1>
  <hr>
</div>
    <!-- {{podaci}} -->
    <table class="table">
  <thead class="thead-dark">
      <td>#</td>
      <td>Razdoblje</td>
      <td>Status</td>
      <td></td>
  </thead>
  <tbody>
    <tr v-for="(data,index) in podaci" :key="data.id" >
          
         <td class="">{{index+1}}. </td>
         <td class="col-md-7">{{moment(data.datum_obavljanja_pocetak).format("DD.MM.YYYY")}} - {{moment(data.datum_obavljanja_kraj).format("DD.MM.YYYY")}} </td>

          <td class="col-md-2">
            <b>Zaključano</b>
          </td>
<td class="col-md-1">
           <button class="btn btn-light"><img src='https://svgshare.com/i/d3E.svg' width=20% height=20% /></button>
          </td>
        </tr>
  </tbody>
</table>




  </div>
</template>
<script>
import moment from "moment";
import {dohvatpodataka} from '@/services'
import {Auth} from '@/services'
export default {
  name: "zakljucano",
  data() {
    return {
      podaci: [],
      moment
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
      this.podaci=await dohvatpodataka.getlockeddata(Auth.state.id)
    }
  },
  filters: {
    moment: function (date) {
      return moment(date).format("MMMM");
    },
  }
};
</script>