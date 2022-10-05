const app = new function() {
    this.tbody = document.getElementById("tbody");

    this.listado = () => {
        fetch("../controllers/listado.php")
            .then((res) => res.json())
            .then((data) => {
                this.tbody.innerHTML = "";
                data.forEach((item) => {
                    this.tbody.innerHTML += `
                    <tr>
                        <td>${item.id_interesado}</td>
                        <td>${item.nombre}</td>
                        <td>${item.apellido}</td>
                        <td>${item.telefono}</td>
                        <td>${item.email}</td>
                        <td>${item.direccion}</td>
                        <td>${item.numero}</td>
                        <td>${item.localidad}</td>
                        <td>${item.dni}</td>
                        <td>
                            <a href="javascript:;" class="btn btn-warning btn-sm" onclick="app.editar(${item.id_interesado})">Editar</a>
                            <a href="javascript:;" class="btn btn-danger btn-sm" onclick="app.eliminar(${item.id_interesado})">Eliminar</a>
                        </td>
                    </tr>
                `;
                });
            })
            .catch((error) => console.log(error));
    };
    this.guardar = () => {
        var form = new FormData();
        form.append("nombre", document.getElementById("nombre").value);
        form.append("apellido", document.getElementById("apellido").value);
        form.append("telefono", document.getElementById("telefono").value);
        form.append("email", document.getElementById("email").value);
        form.append("direccion", document.getElementById("direccion").value);
        form.append("numero", document.getElementById("numero").value);
        form.append("localidad", document.getElementById("localidad").value);
        form.append("dni", document.getElementById("dni").value);
        form.append("id_interesado", document.getElementById("id_interesado").value);
        if (form.get("id_interesado") == "") {
            fetch("../controllers/guardar.php", {
                method: "POST",
                body: form,
            })
                .then((res) => res.json())
                .then((data) => {
                    alert("Creado con exito");
                    this.listado();
                    this.limpiar();
                })
                .catch((error) => console.log(error));
        } else {
            fetch("../controllers/actualizar.php", {
                method: "POST",
                body: form,
            })
                .then((res) => res.json())
                .then((data) => {
                    alert("Actualizado con exito");
                    this.listado();
                    this.limpiar();
                })
                .catch((error) => console.log(error));
        }
    };
    this.editar = (id) => {
        var form = new FormData();
        form.append("id", id);
        fetch("../controllers/editar.php", {
            method: "POST",
            body: form,
        })
            .then((res) => res.json())
            .then((data) => {
                document.getElementById("id_interesado") = data.id_interesado;
                document.getElementById("nombre").value = data.nombre;
                document.getElementById("apellido").value = data.apellido;
                document.getElementById("telefono").value = data.telefono;
                document.getElementById("email").value = data.email;
                document.getElementById("direccion").value = data.direccion;
                document.getElementById("numero").value = data.numero;
                document.getElementById("localidad").value = data.localidad;
                document.getElementById("dni").value = data.dni;
            })
            .catch((error) => console.log(error));
    };
    this.eliminar = (id) => {
        var form = new FormData();
        form.append("id", id);
        fetch("../controllers/eliminar.php", {
            method: "POST",
            body: form,
        })
            .then((res) => res.json())
            .then((data) => {
                alert("Eliminado con exito");
                this.listado();
            })
            .catch((error) => console.log(error));
    }
    this.limpiar = () => {
        document.getElementById("nombre").value = "";
        document.getElementById("apellido").value = "";
        document.getElementById("telefono").value = "";
        document.getElementById("email").value = "";
        document.getElementById("direccion").value = "";
        document.getElementById("numero").value = "";
        document.getElementById("localidad").value = "";
        document.getElementById("dni").value = "";
        document.getElementById("id_interesado").value = "";
      };
}();
app.listado();