<template>
  <div class="home">
    <div v-if="state == true || state == false">
      <router-view />
    </div>
    <div v-else>
      <pocetna />
    </div>
  </div>
</template>

<script>
import { Auth } from "@/services";
import pocetna from "./pocetna.vue";
export default {
  components: { pocetna },
  name: "Home",
  data() {
    return {
      state: Auth.state.admin,
    };
  },
};
</script>
