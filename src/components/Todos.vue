<template>
  <transition-group
    v-show="!!userClass"
    name="fade"
    tag="ul"
    class="p-0 main-todo"
  >
    <Todo
      v-for="(todo, index) in this.userClass.todoList"
      :key="todo.text_id"
      :todo="todo"
      :index="index"
    />
  </transition-group>
</template>

<script>
import { mapGetters } from "vuex";
import Todo from "./Todo";

export default {
  components: {
    Todo,
  },
  computed: {
    ...mapGetters(["userClass"]),
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables";

.main-todo {
  padding-top: 10px;
}

//? cssアニメーション
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active {
  animation: fade-in 1s;
}
.fade-leave-active {
  position: absolute;
  animation: fade-in 0.2s reverse;
}
.fade-move {
  transition: transform 0.3s;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
