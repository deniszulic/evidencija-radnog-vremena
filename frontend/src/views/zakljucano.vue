<template>
  <div v-if="store.state == false">
    <div v-if="errormsg" class="alert alert-danger">
      {{ errormsg }}
    </div>
    <div class="jumbotron">
      <h1 class="display-4">Zaključano</h1>
      <hr />
      <input
        type="text"
        v-model="search"
        placeholder="Pretraži po datumu početka"
        style="width: 50%"
      />
      <hr />
    </div>
    <table class="table">
      <tbody>
        <zakljucanotablica
          :data="podaci"
          :search="search"
          style="text-align: center"
        />
      </tbody>
    </table>
  </div>
</template>
<script>
import moment from "moment";
import { dohvatpodataka } from "@/services";
import { Auth } from "@/services";
import zakljucanotablica from "@/components/zakljucanotablica.vue";
import store from "@/store.js";
export default {
  name: "zakljucano",
  components: {
    zakljucanotablica,
  },
  data() {
    return {
      podaci: [],
      moment,
      store,
      errormsg: "",
      search: "",
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData",
  },
  methods: {
    async fetchData() {
      try {
        this.podaci = await dohvatpodataka.getlockeddata(Auth.state.id);
      } catch (e) {
        this.errormsg = e.message;
      }
    },
  },
  filters: {
    moment: function (date) {
      return moment(date).format("MMMM");
    },
  },
};
</script>