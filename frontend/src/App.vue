<template>
  <div id="app">
    <form @submit.prevent="register">
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
  </div>
</template>

<script>
import {Registracija} from "@/services";
export default {
  name: 'App',
  data(){
    return{
      email:'',
      password:''
    }
  },
  methods:{
    async register(){
      let a={
        email:this.email,
        lozinka:this.password.toString(),
        ime:'joe',
        prezime:'mama',
        admin_id:1
      }
      await Registracija.register(a);
    }
  }
}
</script>

<style>
</style>
