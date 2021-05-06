import firebase from 'firebase/app'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyBR8se4yDO2bjPrdPjeirPqMVX7K6JRqAg',
  authDomain: 'smui-gen-e8517.firebaseapp.com',
  databaseURL: 'https://smui-gen-e8517-default-rtdb.firebaseio.com',
  projectId: 'smui-gen-e8517',
  storageBucket: 'smui-gen-e8517.appspot.com',
  messagingSenderId: '941015827989',
  appId: '1:941015827989:web:f931702a1a9154ed55b01c',
  measurementId: 'G-F1EMLP9HYN',
}

// eslint-disable-next-line no-unused-expressions
!firebase.apps.length ? firebase.initializeApp(config) : ''

export const auth = firebase.auth()
