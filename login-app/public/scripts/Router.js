import Auth from "./Auth.js";

const Router = {
    init: () => {
        document.querySelectorAll("a.navlink").forEach(a => {
            a.addEventListener("click", event => {
                event.preventDefault();
                const href = event.target.getAttribute("href");
                Router.go(href);
            });
        });  
        
        window.addEventListener('popstate',  event => {
            Router.go(event.state.route, false);
        });
           
        Router.go(location.pathname);
    },    
    go: (route, addToHistory=true) => {
        if (addToHistory) {
            history.pushState({ route }, '', route);
        }
        document.querySelectorAll("section.page")
            .forEach(s => s.style.display = "none");
        switch (route) {
            case "/":
                document.querySelector("section#home").style.display = "block";
                break;
            case "/login":
                Auth.init();                
              document.querySelector("section#login").style.display = "block";
              document.querySelector("section#home").style.display = "none";
                break;                
            case "/register":
              document.querySelector("section#register").style.display = "block";
              document.querySelector("section#home").style.display = "none";
                break;                
            case "/account":
                if (Auth.isLoggedIn) {
                  document.querySelector("section#account").style.display = "block";
                  document.querySelector("section#home").style.display = "none";
                } else {
                    Router.go("/login");
                }
                break;
            default:                
                break;   
        }
        window.scrollX = 0;
    }
}

window.Router = Router; 
export default Router;