import * as _firebase from 'firebase/app';

import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBMG6wf4iIkAzGeQ_N0P4X3XNGRkM6l0Mw",
  authDomain: "group03-nodemy.firebaseapp.com",
  projectId: "group03-nodemy",
  storageBucket: "group03-nodemy.appspot.com",
  messagingSenderId: "887034289204",
  appId: "1:887034289204:web:fd7b2577b2a34a348b3e61"
};

const firebase = _firebase.default.initializeApp(firebaseConfig);

export default firebase;
