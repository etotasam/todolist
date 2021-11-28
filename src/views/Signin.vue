<template>
  <div class="auth">
    <main class="auth_container">
      <div class="auth_wrapper">
        <h2 class="text-center">Signin</h2>
        <div v-show="isSigninError">{{ signinErrorMessage }}</div>
        <div class="auth_inner">
          <input
            v-model="email"
            :class="emailStatus"
            @focus="inFocus"
            @blur="outFocus"
            type="email"
          />
          <span data-placeholder="Email"></span>
        </div>
        <div class="auth_inner">
          <input
            v-model="password"
            :class="passwordStatus"
            @focus="inFocus"
            @blur="outFocus"
            type="password"
          />
          <span data-placeholder="Password"></span>
        </div>
        <button
          class="auth_send_btn"
          :tabindex="tabindex"
          :class="hasPassTheInputRule"
          @click="toSignin"
        >signin</button>
      </div>
      <router-link :to="{name: 'Login'}">Login</router-link>
    </main>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { LoginSigninMixin } from "./LoginSigninMIxin";

export default {
  mixins: [LoginSigninMixin],
  data() {
    return {
      isSigninError: false,
      signinErrorMessage: "すでに登録されているメールアドレスです"
    }
  },
  methods: {
    ...mapMutations(["setIsLoading"]),

    async toSignin() {
      try {
        this.isSigninError = false;
        this.setIsLoading(true);
        await this.firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
        this.email = "";
        this.password = "";
      }
      catch {
        this.isSigninError = true;
        this.setIsLoading(false);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/account_auth";
</style>