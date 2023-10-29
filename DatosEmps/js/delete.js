window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init(){
    if(localStorage.getItem("token")) {
        headers = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")

            }
            
        }
        loadEmpleados();
    }
    else {
        window.location.href = "index.html";
    }
}

function loadEmpleados() {
    axios.get(url + "/empleados", headers)
    .then(function(res) {
        console.log(res.data.message);
        displayEmpleados(res.data.message);
    }).catch(function(err) {
        console.log(err);
    })
}

function displayEmpleados(empleados) {
    var body = document.querySelector("body");
    for(var i = 0; i < empleados.length; i++) {
        body.innerHTML += `<h3>${empleados[i].id} ${empleados[i].nombre} ${empleados[i].apellidos} ${empleados[i].telefono} ${empleados[i].correo}<h3>`;
    }
    
    document.querySelector('.btn-secondary').addEventListener('click', function(){
        var id = document.getElementById('input-delete').value;
        dlt(id);
    });

    document.querySelector('.btn-primary').addEventListener('click', function() {
        window.location.href = "empleados.html"
    });
}
function dlt(id){
    axios.delete(url + "/empleados/" + id, headers)
    .then(function(res) {
        console.log(res);
        alert(`${res.data.message}`);
        window.location.href = ("empleados.html");
    }).catch(function(err) {
        console.log(err);
    })
}