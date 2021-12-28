<template>
    <div>
        <!-- <table class="table"> -->
    <thead class="thead-dark">
      <td><button @click="back()">Nazad</button></td>
      <td>Razdoblje</td>
      <td>Status</td>
      <td></td>
    </thead>
    <tbody>
    <tr v-for="(a, index) in data" :key="a.id">
      <td class="">{{ index + 1 }}.</td>
      <td class="col-md-7">
        {{ moment(a.datum_obavljanja_pocetak).format("DD.MM.YYYY") }} -
        {{ moment(a.datum_obavljanja_kraj).format("DD.MM.YYYY") }}
      </td>
      <td class="col-md-2">
        <b>Zaključano</b>
      </td>
      <td class="col-md-1">
        <button class="btn btn-light">
          <img src="https://svgshare.com/i/d3E.svg" width="20%" height="20%" />
        </button>
      </td>
    </tr></tbody>
    <!--</table>  -->
  </div>
</template>
<script>
import moment from "moment";
import store from "@/store.js";
export default {
    props: ["data"],
    data(){
        return{
            moment,
            store
        }
    },
    methods:{
        back(){
            this.store.open=false;
        }
    }
}
</script>