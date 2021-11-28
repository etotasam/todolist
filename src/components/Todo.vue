<template>
  <li
    class="main-todo_post_wrap"
    @mouseover="showTrashbox()"
    @mouseleave="hideTrashbox()"
  >
    <span
      @click="doneIt(index)"
      :class="{ todo_done: todo.done }"
      :data-textid="todo.text_id"
      >{{ todo.text }}</span
    >
    <transition name="trashBoxDuration" tag="div">
      <i
        class="fas fa-trash-alt trashbox"
        v-show="trashBox.active && trashBox.show"
        @click="deleteTodo(index)"
        :data-textid="todo.text_id"
      ></i>
    </transition>
  </li>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["todo", "index"],
  data() {
    return {
      showTrashBox: false,
      trashBox: {
        active: true,
        show: false,
      },
    };
  },
  computed: {
    ...mapGetters(["userClass"]),
    db() {
      return this.$store.state.db;
    },

    queryToUsersDatabase() {
      return this.db.collection("users").doc(this.userClass.userInfo.uid);
    },
  },
  methods: {
    showTrashbox() {
      this.trashBox.show = true;
      // this.trashBox.index = index;
    },

    hideTrashbox() {
      this.trashBox.show = false;
      // this.trashBox.index = index;
    },

    async doneIt(index) {
      // ev.target.classList.toggle("todo_done");
      const getThis = await this.queryToUsersDatabase
        .collection("todo_list")
        .where("text_id", "==", this.userClass.todoList[index].text_id)
        .get()
        .catch((err) => console.log("get error:", err));
      getThis.forEach((doc) => {
        this.queryToUsersDatabase
          .collection("todo_list")
          .doc(doc.id)
          .update({
            done: !doc.data().done,
          })
          .catch((err) => console.log("update error:", err));
      });
    },

    async deleteTodo(index) {
      // this.trashBox.active = false;

      try {
        const deleteThing = await this.queryToUsersDatabase
          .collection("todo_list")
          .where("text_id", "==", this.userClass.todoList[index].text_id)
          .get();
        deleteThing.forEach((doc) => {
          this.queryToUsersDatabase
            .collection("todo_list")
            .doc(doc.id)
            .delete();
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables";

.main-todo_post_wrap {
  position: relative;
  outline: none;
  width: clamp(300px, 70vw, 800px);

  > span::after {
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    pointer-events: none;
    background-color: map-get($colors, "light_gray");
    opacity: 0;
  }
  &:hover {
    > span::after {
      opacity: 1;
      transition: 0.5s;
    }
  }
  > span {
    cursor: pointer;
  }
}

.todo_done {
  text-decoration: line-through;
  color: map-get($colors, "light_gray");
}

.trashbox {
  color: map-get($colors, "main-gray");
  position: absolute;
  top: 0;
  right: 0;
  // float: right;
  cursor: pointer;
}

//cssアニメーション

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.trashBoxDuration-enter {
  opacity: 0;
}

.trashBoxDuration-enter-to {
  opacity: 1;
}

.trashBoxDuration-enter-active {
  animation: fade-in 0.5s;
}
</style>