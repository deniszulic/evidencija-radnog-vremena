<template>
  <div id="app">
    <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link to="pocetna" class="nav-link" @click.native="changevalue()"><img src="https://i.ibb.co/zmBCGtv/logo.png" alt="logo" width="200" height="30"></router-link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive12" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>    
  <div class="collapse navbar-collapse" id="navbarResponsive12">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item"><router-link to="pocetna" class="nav-link" @click.native="changevalue()">Home <span class="sr-only"></span></router-link></li>
                        <li class="nav-item"><router-link v-if="store.state==null" to="login" class="nav-link">Login <span class="sr-only"></span></router-link></li>
                        <li class="nav-item"><router-link v-if="store.state==null" to="register"  class="nav-link"> Register <span class="sr-only"></span></router-link></li>
                    
                    <li class="nav-item active" >
                    <router-link to="calendar" v-if="store.state==false" class="nav-link"><!--{{state}}--> Upiši sate <span class="sr-only"></span></router-link>
      </li>
      <li class="nav-item active" >
                    <router-link to="profile" v-if="store.state==false" class="nav-link" @click.native="changevalue()"><!--{{state}}--> Profil <span class="sr-only"></span></router-link>
      </li>
      <li class="nav-item active" >
                    <router-link to="zakljucano" v-if="store.state==false" class="nav-link">Zaključano<span class="sr-only"></span></router-link>
      </li>
      <li class="nav-item active" >
                    <router-link to="adminzakljucano" v-if="store.state==true" class="nav-link" @click.native="changevalue()"><!--{{state}}--> Zaključano <span class="sr-only"></span></router-link>
      </li>
      <li class="nav-item active" >
                    <router-link to="adminprofil" v-if="store.state==true" class="nav-link" ><!--{{state}}--> Profil <span class="sr-only"></span></router-link>
      </li>

                    <li class="nav-item active" >
        <a v-if="store.state!=null"
                    @click.prevent="logout"
                    class="btn btn-danger my-2 my-sm-0 mr-2"
                    href="#"
                  >Logout</a>
      </li>
                    
                    </ul>
                </div>

</nav>
</div>



<div class="container">
<router-view/>
</div>

  

<!-- footer -->
<footer class="bg-light text-center text-lg-start footer">
  <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);"><div style="float:left;">
{{ date }}
</div><div style="float:right;">
{{ time }}
</div>
    © {{new Date().getFullYear()}} Copyright:
    <a class="text-dark" href="https://github.com/deniszulic/evidencija-radnog-vremena" target="_blank">wHours</a>
  </div>
</footer>

  </div><!-- app -->
</template>

<script>
import {Registracija} from "@/services";
import { Auth } from "@/services";
import store from '@/store.js'
export default {
  name: 'App',
  data(){
    return{
      store,
      timestamp:"",
      time:"",
      date:""
    }
  },
  created() {
                setInterval(this.getNow, 1000);
            },
  methods: {
    logout() {
      Auth.logout();
      this.store.state=null;
      this.$router.push({ path: 'pocetna' });
    },
    changevalue(){
      this.store.open=false
    },
    getNow: function() {
                    const dan = new Date();
                    const date = dan.getDate()+'/'+(dan.getMonth()+1)+'/'+dan.getFullYear();
                    const time = dan.getHours() + ":" + dan.getMinutes() + ":" + dan.getSeconds();
                    const dateTime = date +' '+ time;
                    this.timestamp = dateTime; /* jedno i drugo */
                    this.time = time;
                    this.date = date;
                    }
  },
}
</script>

<style>
body {
  font-family: "Poppins", sans-serif;
  min-height: 400px;
   margin-bottom: 100px;
   clear: both;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  line-height: 20px;
}

#formContent {
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: #fff;
  padding: 30px;
  width: 90%;
  max-width: 450px;
  position: relative;
  padding: 0px;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
  box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
  text-align: center;
}

#formFooter {
  background-color: #f6f6f6;
  border-top: 1px solid #dce8f1;
  padding: 25px;
  text-align: center;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
}



/* TABS */

h2.inactive {
  color: #cccccc;
}

h2.active {
  color: #0d0d0d;
  border-bottom: 2px solid #5fbae9;
}



/* FORM TYPOGRAPHY*/

input[type=button], input[type=submit], input[type=reset]  {
 /* background-color: #56baed; */
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
  box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

input[type=button]:hover, input[type=submit]:hover, input[type=reset]:hover  {
  background-color: #39ace7;
}

input[type=button]:active, input[type=submit]:active, input[type=reset]:active  {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}

input[type=text] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

input[type=text]:focus {
  background-color: #fff;
  border-bottom: 2px solid #5fbae9;
}

input[type=text]:placeholder {
  color: #cccccc;
}



/* ANIMATIONS */

/* Simple CSS3 Fade-in-down Animation */
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

/* Simple CSS3 Fade-in Animation */
@-webkit-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@-moz-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

.fadeIn {
  opacity:0;
  -webkit-animation:fadeIn ease-in 1;
  -moz-animation:fadeIn ease-in 1;
  animation:fadeIn ease-in 1;

  -webkit-animation-fill-mode:forwards;
  -moz-animation-fill-mode:forwards;
  animation-fill-mode:forwards;

  -webkit-animation-duration:1s;
  -moz-animation-duration:1s;
  animation-duration:1s;
}

.fadeIn.first {
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

.fadeIn.second {
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  animation-delay: 0.6s;
}

.fadeIn.third {
  -webkit-animation-delay: 0.8s;
  -moz-animation-delay: 0.8s;
  animation-delay: 0.8s;
}

.fadeIn.fourth {
  -webkit-animation-delay: 1s;
  -moz-animation-delay: 1s;
  animation-delay: 1s;
}

/* Simple CSS3 Fade-in Animation */
.underlineHover:after {
  display: block;
  left: 0;
  bottom: -10px;
  width: 0;
  height: 2px;
  background-color: #56baed;
  content: "";
  transition: width 0.2s;
}

.underlineHover:hover {
  color: #0d0d0d;
}

.underlineHover:hover:after{
  width: 100%;
}



/* OTHERS */

*:focus {
    outline: none;
} 

#icon {
  width:60%;
}


</style>