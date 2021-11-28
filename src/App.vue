<template>
  <v-app>
    <VueLoading v-show="isLoading"></VueLoading>
    <!-- <keep-alive> -->
    <router-view v-show="!isLoading"></router-view>
    <!-- </keep-alive> -->
  </v-app>
</template>

<script>
import VueLoading from "./views/VueLoading";
import { mapGetters, mapMutations } from "vuex";
import { User } from "./models/model";

export default {
  components: {
    VueLoading,
  },
  computed: {
    ...mapGetters(["firebase", "isLoading", "userInfo", "test", "userClass"]),
  },
  watch: {
    $route(to) {
      this.createPageTitle(to);
    },
  },
  methods: {
    ...mapMutations(["setUserInfo", "setIsLoading", "setUserClass"]),

    hasAuth() {
      this.firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setUserClass(new User(user));
        } else {
          this.setIsLoading(false);
          this.setUserClass(null);
        }
      });
    },
    createPageTitle(to) {
      if (to.meta.title) {
        document.title = to.meta.title;
      } else {
        document.title = "ToDoList";
      }
    },
  },

  created() {
    this.hasAuth();
  },
  mounted() {
    // let to = this.$route
    this.createPageTitle(this.$route);
    this.setIsLoading(false);
  },
};
</script>

<style lang="scss">
@import "./assets/scss/_variables";
$base-font-size: clamp(16px, 1.5vw, 32px);
// * {
//   outline: 1px solid black;
//   background-color: rgba(0, 217, 255, 0.111);
// }

div {
  font-size: map-get($font-size, "base");
}

#app {
  min-height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
