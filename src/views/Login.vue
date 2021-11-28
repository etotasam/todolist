<template>
  <div class="auth">
    <main class="auth_container">
      <div class="auth_wrapper">
        <h2 class="text-center">Login</h2>
        <div v-if="login_error" class="login_error_message">{{ comment }}</div>
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
          @click="toLogin"
        >
          login
        </button>
        <!-- <button @click="toLoginByGoogle">googleでログインだ！</button> -->
        <button class="login_btn_by_google" @click="toLoginByGoogle">
          <img src="https://img.icons8.com/color/48/000000/google-logo.png" />
          <span>Login with Google</span>
        </button>
      </div>
      <router-link :to="{ name: 'Signin' }">signin</router-link>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { LoginSigninMixin } from "./LoginSigninMIxin";

export default {
  mixins: [LoginSigninMixin],
  data() {
    return {
      comment: "※EmailかPasswordに誤りがあります",
      login_error: false,
    };
  },

  computed: {
    ...mapGetters(["providerGoogle"]),
  },

  methods: {
    ...mapMutations(["setUserInfo", "setIsLoading"]),

    hasAuth() {
      this.firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setUserInfo(user);
          // this.email = ""
          // this.password = ""
        } else {
          this.setIsLoading(false);
        }
      });
    },

    async toLogin() {
      this.login_error = false;
      this.setIsLoading(true);
      await this.firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .catch((err) => {
          this.login_error = true;
          console.log("ログインエラー", err);
        });
      this.hasAuth();
    },
    async setAuthDataWithGoogle() {
      const user = await this.firebase.auth().currentUser;
      const testData = await this.db.collection("users").doc(user.uid).get();
      if (!testData.data()) {
        // this.setIsLoading(true)
        this.db.collection("users").doc(user.uid).set({
          text_id: 0,
          uid: user.uid,
          email: user.email,
          created_at: this.firebase.firestore.FieldValue.serverTimestamp(),
        });
        // this.setAuthDataWithGoogle()
      }
    },

    async toLoginByGoogle() {
      try {
        await this.firebase
          .auth()
          .signInWithPopup(this.providerGoogle)
          .catch((err) => {
            throw new Error(err);
          });
        this.setAuthDataWithGoogle();
      } catch {
        return;
      }
    },
  },
  created() {
    this.email = "terakado@terakado.jp";
    this.password = "terakado";
  },
  mounted() {
    // this.setIsLoading(false);
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/account_auth";

.login_error_message {
  color: red;
}
</style>