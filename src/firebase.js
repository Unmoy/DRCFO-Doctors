import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// const app = firebase.initializeApp({
//   apiKey: "AIzaSyDIpTltkKRYnnrx5z3ZQmyPXh8HKLr5WkU",
//   authDomain: "reservefree-2827c.firebaseapp.com",
//   projectId: "reservefree-2827c",
//   storageBucket: "reservefree-2827c.appspot.com",
//   messagingSenderId: "156255074174",
//   appId: "1:156255074174:web:c56ae1b294e2ff08e1652f",
// });

const app = firebase.initializeApp({
  apiKey: "AIzaSyAlxFyLg9EXM4hx9tIvyWcuaXXNRtBf_8E",
  authDomain: "reservefree-49b84.firebaseapp.com",
  projectId: "reservefree-49b84",
  storageBucket: "reservefree-49b84.appspot.com",
  messagingSenderId: "366260763798",
  appId: "1:366260763798:web:f6e8caadce1d9f18d216b7",
  measurementId: "G-2YFTEB26QW",
});

export const authentication = app.auth();
export default app;

//  Connected to sampras acoount
