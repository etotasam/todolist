<template>
  <v-card>
    <v-card-title class="headline" style="font-size: 10px"
      ><span>{{ modalComment }}</span></v-card-title
    >
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn text @click="closeModal" ref="btn"> OK </v-btn>
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
span {
  font-size: 16px;
  color: #2c3e50;
}
</style>