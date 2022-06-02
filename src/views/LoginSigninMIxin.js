export const LoginSigninMixin = {
  data() {
    return {
      email: "",
      password: "",
      emailStatus: { active: false, pass_verify: false },
      passwordStatus: { not_empty: false, pass_verify: false },
      emailRegexp: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
    }
  },
  computed: {
    firebase() {
      return this.$store.getters.firebase
    },
    db() {
      return this.$store.state.db;
    },
    hasPassTheInputRule() {
      if (this.emailRegexp.test(this.email) && (this.password.length >= 6 && this.password.length < 20)) {
        return { btn_click_permission: true }
      } else {
        return { btn_click_permission: false }
      }
    },
    tabindex() {
      if (this.emailRegexp.test(this.email) && (this.password.length >= 6 && this.password.length < 20)) {
        return "0"
      } else {
        return "-1"
      }
    },
  },

  watch: {
    email: function () {
      //? emailが空かどうか
      if (this.email) {
        this.emailStatus.active = true
      }
      //? emailの検証
      if (this.emailRegexp.test(this.email)) {
        this.emailStatus = { ...this.emailStatus, pass_verify: true }
      } else {
        this.emailStatus = { ...this.emailStatus, pass_verify: false }
      }

    },
    password: function () {
      if (this.password) {
        this.passwordStatus.active = true
      }
      if (this.password.length >= 6 && this.password.length <= 20) {
        this.passwordStatus = { ...this.passwordStatus, pass_verify: true }
      } else {
        this.passwordStatus = { ...this.passwordStatus, pass_verify: false }
      }
    }
  },
  methods: {
    inFocus(ev) {
      ev.target.classList.add("active");
    },

    outFocus(ev) {
      const el = ev.target;
      if (el.value == "") {
        el.classList.remove("active");
      }
    }
  }
}