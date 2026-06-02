

document.addEventListener("DOMContentLoaded",()=>{

    const currentUser =
    JSON.parse(
        localStorage.getItem("currentUser")
    );

    const guestMenu =
    document.getElementById("guestMenu");

    const guestRegister =
    document.getElementById("guestRegister");

    const userMenu =
    document.getElementById("userMenu");

    const userBtn =
    document.getElementById("userBtn");

    const dropdownMenu =
    document.getElementById("dropdownMenu");

    const navUsername =
    document.getElementById("navUsername");

    const navAvatar =
    document.getElementById("navAvatar");

    const dropdownAvatar =
    document.getElementById("dropdownAvatar");

    const dropdownName =
    document.getElementById("dropdownName");

    const adminLink =
    document.getElementById("adminLink");

    if(currentUser){

        guestMenu.style.display="none";
        guestRegister.style.display="none";
        userMenu.style.display="block";

        navUsername.innerText =
        currentUser.fullname;

        navAvatar.innerText =
        currentUser.fullname.charAt(0).toUpperCase();

        dropdownAvatar.innerText =
        currentUser.fullname.charAt(0).toUpperCase();

        dropdownName.innerText =
        currentUser.fullname;

        if(
            currentUser.role==="admin"
            &&
            adminLink
        ){
            adminLink.style.display="flex";
        }

    }else{

        userMenu.style.display="none";

    }

    if(userBtn){

        userBtn.addEventListener(
            "click",
            function(e){

                e.preventDefault();

                dropdownMenu.classList.toggle(
                    "show"
                );

            }
        );

    }

    document.addEventListener(
        "click",
        function(e){

            if(
                !e.target.closest("#userMenu")
            ){

                dropdownMenu.classList.remove(
                    "show"
                );

            }

        }
    );

});

function logoutNavbar(){

    localStorage.removeItem(
        "currentUser"
    );

    location.reload();

}


