let myNav = document.querySelector('#navBar');
let desLogo = document.querySelector('.desLogo');
let mobLogo = document.querySelector('.mobLogo');
let siteLocation=window.location.pathname;
let home=document.querySelector("#home");
let service=document.querySelector("#services");
let product=document.querySelector("#products");
let about=document.querySelector("#about");
let customerReview=["Excellent work by the company and team","Solved our automization problem very accuretly","Hat's off to their team member",
                    "It was nice, working with them","Must Approch them for automization","Great technology and solutions"];
let customerName=["Aeda Shelby","Ratan Tata","Freeni Throne","Vijaynath Patel","Lana Sekh","Miachle Gray"];
let customerCompany=["Shelby Limited,London","Tata and Son's,India","Throne Limited,Japan",
                    "Zydus Group,India","GoodWill Limited,UAE","Gary Group of Companies,Italy"];

function customer(id){
  document.getElementById("review").innerHTML=customerReview[id];
  document.getElementById("customerName").innerHTML=customerName[id];
  document.getElementById("customerCompany").innerHTML=customerCompany[id];
}

switch (siteLocation) {
    case '/services':
        service.style.borderBottom='5px solid orange';
        break;

    case '/products':
        product.style.borderBottom='5px solid orange';
        break;

    case '/about':
        about.style.borderBottom='5px solid orange';
        break;

    default:
        home.style.borderBottom='5px solid orange';
}


function moveTop() {
  let scrolly=((document.body.scrollY)/(document.body.clientHeight))*100;
  let scrolltop=((document.documentElement.scrollTop)/(document.body.clientHeight))*100;

  if ((scrolly >= 0.5 ||scrolltop >= 0.5)) {
    myNav.style.background="linear-gradient(45deg,rgb(53,25,25),rgb(88, 10, 10))";
    mobLogo.style.display="block";
    desLogo.style.display="none";
  }
  
  if ((scrolly <= 1 ||scrolltop <= 1)) {
    myNav.style.background="transparent";
    desLogo.style.display="block";
    mobLogo.style.display="none";
  }
}

window.onscroll = function() {moveTop()};