<template>
  <div class="global_container">
    <header class="header_container">
      <Header @modal-state="modal = $event" />
    </header>
    <main class="main_container">
      <Todos v-if="userClass" />
    </main>
    <!-- 入力をチェックしてモーダルを表示 -->
    <v-row v-show="modal.show" justify="center">
      <v-dialog v-model="modal.show" max-width="450">
        <Modal
          :modal-comment="modal.comment"
          @close-modal="modal.show = false"
        />
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Todos from "../components/Todos";
import Modal from "../components/Modal";
import Header from "../components/Header";

export default {
  components: {
    Todos,
    Modal,
    Header,
  },
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
    ...mapGetters(["db", "firebase", "userInfo", "userClass"]),
    queryGetUserDB() {
      return this.db.collection("users").doc(this.userClass.userInfo.uid);
    },
  },

  methods: {
    ...mapMutations(["setIsLoading"]),

    async getUserTextId() {
      const user = await this.queryGetUserDB.get();
      this.userClass.userPostNumber.setter = user.data().text_id;
    },

    //? 読み込み時に実行される.onSnapshotの中で使うモジュール関数郡
    //? .onSnapshotの中で使う関数
    //? 取得したsnapshotのsourceがServerかLocalかで追加されたデータかどうかを判断している。
    checkingSource(
      snapshot,
      caseLocalCallback,
      caseServerCallback = () => {
        return;
      }
    ) {
      const source = snapshot.metadata.hasPendingWrites ? "Local" : "Server";
      if (source == "Local") {
        caseLocalCallback;
      } else if (source == "Server") {
        caseServerCallback;
      }
    },

    //? .onSnapshotの中で使う関数
    //? 新しく追加されたデータ(soruceがLocal)をToTodosArray配列の先頭に追加
    newTodoAddToTodosArray(snapshot) {
      snapshot.forEach((doc) => {
        this.checkingSource(doc, (doc) => {
          let list = doc.data();
          let hasData = this.userClass.todoList.includes(list.id);
          if (!hasData) {
            this.userClass.todoList.unshift(list);
            // this.userClass.unshiftTodolist(doc.data());
          }
        });
      });
    },

    //? .onSnapshotの中で使う関数
    //? firesoreから取得したデータをToTodosArray配列に追加
    resourceDataPushToTodosArray(snapshot) {
      //TodoListを毎回初期化
      this.userClass.modelsTodoList = [];
      snapshot.forEach((doc) => {
        let list = doc.data();
        this.userClass.todoList.push(list);
        // this.userClass.pushTodoList(doc.data());
      });
    },

    //? ページ読み込み時に実行
    //? snapshotをとって監視して、データが追加されたら変更を反映
    async getToDoListSnapshot() {
      await this.queryGetUserDB
        .collection("todo_list")
        .orderBy("timestamp", "desc")
        .onSnapshot(
          (snapshot) => {
            this.checkingSource(
              snapshot,
              this.newTodoAddToTodosArray(snapshot),
              this.resourceDataPushToTodosArray(snapshot)
            );
          },
          () => {
            return;
          }
        );
    },

    async renderToDoList() {
      await this.getToDoListSnapshot();
      this.getUserTextId();
    },
  },

  mounted() {
    this.renderToDoList().catch((err) => console.log(err));
    this.setIsLoading(false);
  },
};
</script>

<style lang="scss" scoped>
.global_container {
  min-height: 100vh;
  display: grid;
  grid-template:
    "....  ....  ...." 20px
    ".... header ...."
    "....  ....  ...." 40px
    "....  main  ...." 1fr
    / auto clamp(300px, 70vw, 800px) auto;
}

.header_container {
  grid-area: header;
}

//////////////////////
/////////main/////////
//////////////////////

.main_container {
  grid-area: main;
  > ul {
    list-style: none;
  }
}
</style>
