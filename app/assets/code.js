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
        form.append("nombre", this.nombre);
        form.append("apellido", this.apellido);
        form.append("telefono", this.telefono);
        form.append("email", this.email);
        form.append("direccion", this.direccion);
        form.append("direccion", this.direccion);
        form.append("numero", this.numero);
        form.append("localidad", this.localidad);
        form.append("dni", this.dni);
        form.append("id", this.id);
        if (this.id === "") {
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
    this.editar = (id_interesado) => {
        var form = new FormData();
        form.append("id_interesado", id_interesado);
        fetch("../controllers/editar.php", {
            method: "POST",
            body: form,
        })
            .then((res) => res.json())
            .then((data) => {
                this.id_interesado = data.id_interesado;
                this.nombre = data.nombre;
                this.apellido = data.apellido;
                this.telefono = data.telefono;
                this.email = data.email;
                this.direccion = data.direccion;
                this.numero = data.numero;
                this.dni = data.dni;
                this.localidad = data.localidad;
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
        this.id_interesado.value = "";
        this.nombre.value = "";
        this.apellido.value = "";
        this.telefono.value = "";
        this.email.value = "";
        this.direccion.value = "";
        this.numero.value = "";
        this.localidad.value = "";
        this.dni.value = "";
      };
}();
app.listado();