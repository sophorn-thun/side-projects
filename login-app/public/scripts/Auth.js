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
    })
  },
  logout: () => {
    Auth.isLoggedIn = false;
    Auth.account = null;
    Auth.updateStatus();
    Router.go("/");
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

export default Auth;

window.Auth = Auth;
