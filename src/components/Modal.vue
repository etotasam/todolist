<template>
  <v-card>
    <v-card-title class="headline" style="font-size: 10px"
      ><span>{{ modalComment }}</span></v-card-title
    >
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn class="btn" text @click="closeModal" ref="btn">
        OK
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    modalComment: {
      type: String,
    },
  },
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables";
span {
  font-size: 16px;
  color: #2c3e50;
}

.btn {
  width: 50px;
  padding: 0;
  background-color: white;
  color: map-get($colors, "light_gray");
  border: 1px solid map-get($colors, "light_gray");
  outline: none;
  box-sizing: border-box;
  transition-duration: 0.3s;

  &:hover,
  &:focus {
    border: 1px solid map-get($colors, "dark_gray");
    background-color: map-get($colors, "dark_gray");
    outline: none;
    color: white !important;
    transition-duration: 0.3s;
  }
}
</style>
