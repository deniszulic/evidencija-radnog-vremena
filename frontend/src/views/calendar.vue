<template>
<div id="app">
<div class="container">

<div class="jumbotron">
  <h1 class="display-4">Upis radnih sati</h1>
  <hr class="my-4">
  <img src="https://i.ibb.co/zmBCGtv/logo.png" alt="logo" width="350" height="100">
  <hr>
</div>

<div class="container">
  <div class="row">
    <div class="col-sm">
      <h2>Odaberi datum: </h2>
      <DatePicker v-model="range" is-range />
    </div>
    
    <div class="col-sm">
      <div class="form-group row">
    <label for="inputPassword" class="col-sm-6 col-form-label">Broj radnih sati</label>
    <div class="col-sm-4">
      <input type="number" class="form-control" id="inputPassword" placeholder="Hours">
    </div>
  </div>
<br>
  <div class="form-group row">
    <label for="inputPassword" class="col-sm-6 col-form-label">Prekovremeni</label>
    <div class="col-sm-4">
      <input type="number" class="form-control" id="inputPassword" placeholder="Hours">
    </div>
  </div>

<br>
  <div class="form-group row">
    <label for="inputPassword" class="col-sm-6 col-form-label">Rad vikendom/blagdanom</label>
    <div class="col-sm-4">
      <input type="number" class="form-control" id="inputPassword" placeholder="Hours">
    </div>
  </div>
<br>
 <div class="form-group row">
    <label for="inputPassword" class="col-sm-6 col-form-label">Noćni rad</label>
    <div class="col-sm-4">
      <input type="number" class="form-control" id="inputPassword" placeholder="Hours">
    </div>
  </div>
<br>

<div class="form-group col-md-5">
      <label for="inputState">Rad od kuće</label>
      <select id="inputState" class="form-control">
        <option selected>NE</option>
        <option>DA</option>
      </select>
    </div>
<br>
    <div class="form-group col-md-10">
    <label for="exampleFormControlTextarea1">Napomena: </label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>


    </div>
    <div class="col-sm">
      <h2>Status:</h2>
      <p><i>Ukupno dana: 2</i></p>
      <p><i>Ukupno sati: 4</i></p>
      <!--<p><i>{{range.start}} - {{range.end}}</i></p>-->
    </div>
  </div>
</div>


<!--
{{currentDate}}

  <DatePicker v-model="range" is-range />-->
  </div>


  </div>



</template>

<script>
import { Calendar, DatePicker } from 'v-calendar';

export default {
  components: {
    Calendar,
    DatePicker
  },
  methods: {
    currentDate() {
      const current = new Date();
      const date = current.getFullYear()+'-'+(current.getMonth()+1)+'-'+current.getDate();
      const time = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
      const dateTime = date +' '+ time;
      
      return dateTime;
    }
  },
  data() {
  return {
    range: {
      start: currentDate(),
      end: currentDate(),
    }
  }
},
  mounted () {
      this.currentDate()
    }/*,
    watch:{
      range
    }*/
}

</script>