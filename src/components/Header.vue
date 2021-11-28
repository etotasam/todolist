<template>
  <div class="header_wrapper">
    <div class="todo_post">
      <input
        ref="textInput"
        v-model="inputToDo"
        @keypress.enter="setToDo"
        type="text"
        placeholder="ToDoを入力してください"
      />
      <span></span>
      <button class="todo_post_add_btn" @click="setToDo">add</button>
    </div>
    <div v-if="!!userClass" class="user_info">
      <p>{{ userClass.userInfo.email }}さんのToDoListです</p>
      <button class="logout_btn" @click="logout">logout</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      inputToDo: "",
      modal: {
        show: false,
        comment: "modal comment",
      },
    };
  },

  computed: {
    ...mapGetters(["firebase", "db", "userClass"]),

    queryToUsersDatabase() {
      return this.db.collection("users").doc(this.userClass.userInfo.uid);
    },
  },

  methods: {
    modalState() {
      this.$emit("modal-state", this.modal);
    },

    async setToDo(ev) {
      if (this.inputToDo === "") {
        this.modal.comment = "未入力です";
        this.modal.show = true;
        this.modalState();
        return;
      }
      if (this.inputToDo.length > 30) {
        this.modal.comment = "入力可能文字数は30文字までです。";
        this.modal.show = true;
        this.modalState();
        return;
      }

      const todosArray = this.userClass.todoList.map((value) => {
        return value.text;
      });

      if (todosArray.includes(this.inputToDo)) {
        this.modal.comment = `"${this.inputToDo}" はすでに含まれています`;
        this.modal.show = true;
        this.modalState();
        return;
      }
      ev.target.disabled = true;

      this.userClass.userPostNumber.setter =
        this.userClass.userPostNumber.getter + 1;
      await this.queryToUsersDatabase.collection("todo_list").add({
        text_id: this.userClass.userPostNumber.getter,
        text: this.inputToDo,
        done: false,
        timestamp: this.firebase.firestore.FieldValue.serverTimestamp(),
      });
      this.inputToDo = "";
      this.incrementUsersTextId();

      ev.target.disabled = false;
      this.$refs.textInput.focus();
    },

    incrementUsersTextId() {
      this.queryToUsersDatabase.update({
        text_id: this.firebase.firestore.FieldValue.increment(1),
      });
    },

    async logout() {
      try {
        await this.firebase.auth().signOut();
      } catch {
        console.log("logout error: ログアウトエラー");
      }
    },

    closeModal() {
      this.modalShow = false;
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/_variables";

.header_wrapper {
  width: 100%;
  position: relative;
}

.todo_post {
  width: 100%;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    bottom: 0px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: map-get($colors, "light_gray");
    z-index: 0;
  }
  > input {
    width: calc(100% - 50px);
    border: none;
    outline: none;
    background: none;
  }
  > input::placeholder {
    color: map-get($colors, "light_gray");
    transition: 0.5s;
  }
  > input:focus::placeholder {
    color: transparent;
    transition: 0.5s;
  }

  > span::after {
    content: "";
    position: absolute;
    bottom: 0px;
    left: 0;
    width: 0%;
    height: 1px;
    background-color: map-get($colors, "dark_gray");
    transition-property: width;
    transition-duration: 0.5s;
    z-index: 10;
  }
  > input:focus + span::after {
    width: 100%;
    transition-duration: 0.5s;
  }
  > input:focus ~ &-add_btn {
    border: 1px solid map-get($colors, "dark_gray");
    color: map-get($colors, "dark_gray");
  }
  > input:focus &-add_btn:hover ~ &-add_btn {
    color: white;
  }
}

.todo_post_add_btn {
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

.user_info {
  position: relative;
  margin-top: 20px;

  > p {
    position: absolute;
    top: 0;
    right: 0;
  }
  @media screen and (max-width: 600px) {
    position: static;
    text-align: center;
    P {
      position: static;
    }
  }
}

.logout_btn {
  color: map-get($colors, "light_gray");
  outline: none;
  border: 1px solid map-get($colors, "light_gray");
  background-color: white;
  transition-duration: 0.3s;

  &:hover,
  &:focus {
    color: white;
    border: 1px solid map-get($colors, "dark_gray");
    background-color: map-get($colors, "dark_gray");
    transition-duration: 0.3s;
    outline: none;
  }
}
</style>