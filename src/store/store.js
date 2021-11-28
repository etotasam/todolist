import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import firebaseConfig from './firebaseConfig'
// import router from '../router/router'

Vue.use(Vuex)

// Initialize Firebase
firebase.initializeApp(firebaseConfig)


export default new Vuex.Store({
  state: {
    userInfo: null,
    userClass: null,
    isLoading: true,  //Modalの表示
    firebase: firebase,
    db: firebase.firestore(),
    providerGoogle: new firebase.auth.GoogleAuthProvider(),
    modalShow: false
  },
  getters: {
    db: state => state.db,
    firebase: state => state.firebase,
    providerGoogle: state => state.providerGoogle,
    isLoading: state => state.isLoading,
    userInfo: state => state.userInfo,
    userClass: state => state.userClass,
    modalShow: state => state.modalShow
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    setUserClass(state, userClass) {
      state.userClass = userClass
    },
    setIsLoading(state, bool) {
      state.isLoading = bool
    },
    setModalShow(state, bool) {
      state.modalShow = bool
    },
  }
})