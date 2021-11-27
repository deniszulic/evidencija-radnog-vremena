<template>
  <div>
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
    <tbody>
        <tr>
          <!--<th scope="row">1</th>-->
          <td>{{podaci}}</td>
          <td>
            <button
              type="button"
              class="btn btn-success"
              data-toggle="modal"
              data-target="#exampleModal" @click="show(podaci)"
            >
              Detalji
            </button>
          </td>
        </tr>
      </tbody>
  </div>
</template>
<script>
import moment from "moment";
import store from '@/store.js'
export default{
    props:["podaci"],
    filters: {
    moment: function (date) {
      return moment(date).format('MMMM');
    }
  },
  data(){
    return {
      store
    }
  },
  methods:{
    show(podaci){
      moment.locale("hr")
      //console.log(podaci)
      //console.log(moment(this.store.podaci.datum_obavljanja_pocetak).format('YYYY MMMM'))
      //if(podaci==moment(this.store.podaci.datum_obavljanja_pocetak).format('YYYY MMMM')){
        for(let i=0;i<this.store.podaci.length;i++){
          //console.log(this.store.podaci[i].datum_obavljanja_pocetak)
          if(podaci==moment(this.store.podaci[i].datum_obavljanja_pocetak).format('YYYY MMMM')){
            //console.log(this.store.podaci[i].datum_obavljanja_pocetak)
            //this.store.datum_obavljanja_pocetak[i]=this.store.podaci[i].datum_obavljanja_pocetak


            this.store.filter.push(this.store.podaci[i])
            $("#exampleModal").modal("show");
        }
      }
    }
  }
}
</script>
