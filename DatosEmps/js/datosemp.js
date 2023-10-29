window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init() {
    if(localStorage.getItem("token")) {
        headers = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")

            }
        }
        loadSearch();
    }
    else{
        window.location.href = "index.html";
    }

    
}
function loadSearch(search) {
    axios.get(url + "/empleados/" + localStorage.getItem("search"), headers)
    .then(function(res) {
        console.log(res.data.message);
        displaySearch(res.data.message);
    }).catch(function(err) {
        console.log(err);
    })
}
function displaySearch(busqueda) {
    var body = document.querySelector("body");
    for(var i = 0; i < busqueda.length; i++) {
        body.innerHTML += `<h3>${busqueda[i].nombre} ${busqueda[i].apellidos} ${busqueda[i].telefono} ${busqueda[i].correo}<h3>`;
    }
    document.querySelector('.btn-secondary').addEventListener('click', function() {
        window.location.href = "empleados.html"
    });

}