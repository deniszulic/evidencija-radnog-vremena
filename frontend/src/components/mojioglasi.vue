<template>
  <div>
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
          <!--<td>Veljača</td>-->
          <td>{{podaci.datum_obavljanja_pocetak|moment}}</td>
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
        </tr>
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
      </tbody>
    </table>
  </div>
</template>
<script>
import moment from "moment";
export default{
    props:["podaci"],
    filters: {
    moment: function (date) {
      return moment(date).format('MMMM');
    }
  }
}
</script>
