<template>
  <div>
    <!-- {{podaci}} -->
  </div>
</template>
<script>
import {dohvatpodataka} from '@/services'
import {Auth} from '@/services'
export default {
  name: "zakljucano",
  data() {
    return {
      podaci: [],
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
  }
};
</script>