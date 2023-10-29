window.onload = init;
var headers = {};

function init() {
    if(localStorage.getItem("token")) {
        headers = {
            headers: {
                "Authorization": "bearer " + localStorage.getItem("token")

            }
        }
        document.querySelector('.btn-secondary').addEventListener('click', function() {
            window.location.href = "empleados.html"
        });
    
        document.querySelector('.btn-primary').addEventListener('click', registro);
    }
    else{
        window.location.href = "index.html";
    }

    
}

function registro() {
    var name = document.getElementById('input-name').value;
    var lastname = document.getElementById('input-apellidos').value;
    var number = document.getElementById('input-telefono').value;
    var mail = document.getElementById('input-mail').value;
    var address = document.getElementById('input-direccion').value;
    
    var data =  {
        nombre: name,
        apellidos: lastname,
        telefono: number,
        correo: mail,
        direccion: address
    }
    axios.post("http://localhost:3000/empleados", data, {
        headers: {
            "Authorization": "bearer " + localStorage.getItem("token")

        }
    })
    .then(function(res) {
        console.log(res);
        alert("Registro Exitoso");
        window.location.href = "empleados.html";
    }).catch(function(err){
        console.log(err);
    })
    /*
    axios({
        headers: { 
            headers: {
                "Authorization": "bearer " + localStorage.getItem("token")

            }
        },
        method: 'post',
        url: 'http://localhost:3000/empleados',
        data: {
            nombre: name,
            apellidos: lastname,
            telefono: number,
            correo: mail,
            direccion: address
        }
    }).then(function(res) {
        console.log(res);
        alert("Registro Exitoso");
        window.location.href = "empleados.html";
    }).catch(function(err){
        console.log(err);
    })
    */
}