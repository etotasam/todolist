export const LoginSigninMixin = {
  data() {
    return {
      email: "",
      password: "",
      emailStatus: { not_empty: false, pass_verify: false },
      passwordStatus: { not_empty: false, pass_verify: false },
      emailRegexp:/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
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
      if(this.emailRegexp.test(this.email) && (this.password.length >= 6 && this.password.length < 20)) {
        return {btn_click_permission: true}
      }else {
        return {btn_click_permission: false}
      }
    },
    tabindex() {
      if(this.emailRegexp.test(this.email) && (this.password.length >= 6 && this.password.length < 20)) {
        return "0"
      }else {
        return "-1"
      }
    },
  },

  watch: {
    email: function() {
      if(this.emailRegexp.test(this.email)) {
        this.emailStatus.pass_verify = true
        this.emailStatus.not_empty = true
      }else {
        this.emailStatus.pass_verify = false
        this.emailStatus.not_empty = true
      }

    },
    password: function() {
      if (this.password.length >= 6 && this.password.length <= 20) {
        this.passwordStatus.pass_verify = true
        this.passwordStatus.not_empty = true
      }else {
        this.passwordStatus.pass_verify = false
        this.passwordStatus.not_empty = true
      }
    }
  },
  methods: {
    inFocus(ev) {
      ev.target.classList.add("not_empty");
    },

    outFocus(ev) {
      const el = ev.target;
      if (el.value == "") {
        el.classList.remove("not_empty");
      }
    }
  }
}