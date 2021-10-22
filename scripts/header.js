document.querySelector(".fa-close")
  .addEventListener("click", function toggleBar() {
    try{
    if(document.getElementById("icon").className === "fa fa-close"){
      document.getElementById("icon").className = "fa fa-bars";
      document.querySelectorAll(".link").forEach(element => {
        element.style.display = "none";
      });
  
    }else{
      document.getElementById("icon").className = "fa fa-close";
      document.querySelectorAll(".link").forEach(element => {
        element.style.display = "block";
      });
    }
  }
  catch(err){
    console.log(err)
  }

  });