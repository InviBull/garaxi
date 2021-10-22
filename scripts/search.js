function redir(){
    let q = document.getElementById("searchbar").value;
    
    if (q == "" || q == "Search your car..."){
        alert("A query in search bar is required!")
    }
    else{
        location.href = `search.html?query=${q}`
    }
}

function filterSearchOptions(){
    let input = document.getElementById("searchbar");
    let ul = document.getElementById("listOptions");
    let lis = ul.getElementsByTagName("li");
    let filter = input.value.toUpperCase()
    
    for (i = 0; i < lis.length; i++) {
        let li = lis[i]
        txtValue = li.textContent || li.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li.style.display = "";
        } 
        else {
            li.style.display = "none";
        }
    }
}

function commonSearch(){
    let listOptions = [];
    
    let ul = document.getElementById('listOptions');

    let child = ul.lastElementChild; 
    while (child) {
        ul.removeChild(child);
        child = ul.lastElementChild;
    }
    
    let i = 0;

    for (let optId in listOptions) {
        let opt = listOptions[optId];
        let subject = document.createElement('li');
        
        subjectContent = document.createTextNode(opt);
        
        subject.id = 'data-' + i;
        subject.setAttribute('myId', i);
        subject.appendChild(subjectContent);

        subject.onclick = function (event) {
            let index = this.getAttribute('myId');
            opt = listOptions[index];
            redirLocation = `search.html?query=${opt}`;
            window.location.href = redirLocation;
            }
        
        ul.appendChild(subject);
        i++;
    }
}
