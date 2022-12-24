class App {
  constructor() {
    this.form = {};

    this.$app = document.querySelector("#app");
    this.$firebaseAuthContainer = document.querySelector(
      "#firebaseui-auth-container"
    );
    this.$logout = document.querySelector(".logout");
    this.$patientBtn = document.querySelector(".patient-button");

    this.ui = new firebaseui.auth.AuthUI(auth);
    this.handleAuth();

    this.addEventListener();
  }

  handleAuth() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userId = user.uid;
        this.redirectToApp();
      } else {
        this.redirectToAuth();
      }
    });
  }
  redirectToApp() {
    this.$firebaseAuthContainer.style.display = "none";
    this.$app.style.display = "block";
  }
  redirectToAuth() {
    this.$firebaseAuthContainer.style.display = "block";
    this.$app.style.display = "none";
    this.ui.start("#firebaseui-auth-container", {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      // Other config options...
    });
  }

  addEventListener() {
    this.$logout.addEventListener("click", () => {
   this.handleLogout();
    });
    this.$patientBtn.addEventListener("click", (event) => {
     console.log("CLICKED")
    })
  }

  handleLogout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.redirectToAuth();
      })
      .catch((error) => {
        console.log("ERROR OCCURR  ED", error);
      });
  }
}
const app = new App();
