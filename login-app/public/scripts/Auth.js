import {loginUser, registerUser} from "./API.js";
import Router from "./Router.js";

const Auth = {
  isLoggedIn: false,
  account: null,
  postLogin: (response, user) => {
    if (response.ok) {
      Auth.isLoggedIn = true;
      Auth.account = user;
      Auth.updateStatus();
      Router.go("/account")
    } else {
      alert(response.message);
    }
    // Credit management API storage for auto login
    if (window.PasswordCredential && user.password) {
      const credentials = new PasswordCredential({
        id: user.email,
        password: user.password,
        name: user.name
      })
      navigator.credentials.store(credentials);
    }
  },
  login: async (event) => {
    if (event)
      event.preventDefault();
    
    const user = {
      email: document.getElementById("login_email").value,
      password: document.getElementById("login_password").value,
    }
    const response = await loginUser(user);
    Auth.postLogin(response, { 
      ...user,
      name: response.name
    });
  },
  autoLogin: async () => {
    if (window.PasswordCredential) {
      const credentials = await navigator.credentials.get({ password: true });
      document.getElementById("login_email").value = credentials.id;
      document.getElementById("login_password").value = credentials.password;
      Auth.login();
    }
  },
  logout: () => {
    Auth.isLoggedIn = false;
    Auth.account = null;
    Auth.updateStatus();
    Router.go("/");
    if (window.PasswordCredential) {
      navigator.credentials.preventSilentAccess();
    }
  },
  loginFromGoogle: async (data) => {
    const response = await API.loginFromGoogle(data)
    Auth.postLogin(response, {
        name: response.name, 
        email: response.email
    });
  },
  register: async (event) => {
    event.preventDefault();
    const user = {
      name: document.getElementById("register_name").value,
      email: document.getElementById("register_email").value,
      password: document.getElementById("register_password").value,
    }
    const response = await registerUser(user);
    Auth.postLogin(response, {
      name: user.name,
      email: user.email
    })
  },
  

  updateStatus() {
        if (Auth.isLoggedIn && Auth.account) {
            document.querySelectorAll(".logged_out").forEach(
                e => e.style.display = "none"
            );
            document.querySelectorAll(".logged_in").forEach(
                e => e.style.display = "block"
            );
            document.querySelectorAll(".account_name").forEach(
                e => e.innerHTML = Auth.account.name
            );
            document.querySelectorAll(".account_username").forEach(
                e => e.innerHTML = Auth.account.email
            );

        } else {
            document.querySelectorAll(".logged_out").forEach(
                e => e.style.display = "block"
            );
            document.querySelectorAll(".logged_in").forEach(
                e => e.style.display = "none"
            );

        }
    },    
    init: () => {
        
    },
}

Auth.updateStatus();
Auth.autoLogin();
export default Auth;

window.Auth = Auth;
