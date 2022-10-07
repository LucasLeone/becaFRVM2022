const app = new function() {
    this.tbody = document.getElementById("tbody");
    this.cursos_interes = document.getElementById("cursos_interes");

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
                        <td>${item.direccion + " " + item.numero}</td>
                        <td>${item.localidad}</td>
                        <td>${item.dni}</td>
                        <td>${item.fecharegistro}</td>
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
    this.listar_cursos = () => {
        this.cursos_interes.innerHTML = "";
        fetch("../controllers/listado_curso.php")
            .then((res) => res.json())
            .then((data) => {
                data.forEach((item) => {
                    this.cursos_interes.innerHTML += `
                    <option id="curso_interes" value="${item.id_curso}" class="curso_interes">${item.nombre}</option>
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
        var options = document.getElementById("cursos_interes").selectedOptions;
        var values = Array.from(options).map(({ value }) => value);
        if (form.get("id_interesado") === "") {
            fetch("../controllers/guardar.php", {
                method: "POST",
                body: form,
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    alert("Creado con exito");
                    values.forEach((item) => {
                        var form_interes = new FormData();
                        form_interes.append("id_interesado", data['id_interesado']);
                        form_interes.append("id_curso", item);
                        fetch("../controllers/registrar_interes.php", {
                            method: "POST",
                            body: form_interes,
                        })
                            .then((res) => res.json())
                            .then((data) => {
                                console.log(data)
                                alert("Registrado el interes con exito");
                            })
                            .catch((error) => console.log(error));
                    })
                    this.listado();
                    app_cursos.listado();
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
                    app_cursos.listado();
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
                document.getElementById("id_interesado").value = data.id_interesado;
                document.getElementById("nombre").value = data.nombre;
                document.getElementById("apellido").value = data.apellido;
                document.getElementById("telefono").value = data.telefono;
                document.getElementById("email").value = data.email;
                document.getElementById("direccion").value = data.direccion;
                document.getElementById("numero").value = data.numero;
                document.getElementById("localidad").value = data.localidad;
                document.getElementById("dni").value = data.dni;
                var form_cursos = new FormData();
                form_cursos.append("id_interesado", data.id_interesado);
                fetch("../controllers/editar_cursos_interes.php", {
                    method: "POST",
                    body: form_cursos,
                })
                    .then((res) => res.json())
                    .then((data) => {
                        var ids_cursos = Array();
                        data.forEach((item) => {
                            ids_cursos.push(item.id_curso);
                        })
                        ids_cursos.forEach((item) => {
                            if (document.getElementById("curso_interes").value in ids_cursos) {
                                document.getElementById("curso_interes").setAttribute("selected", true);
                            }
                        })
                    })
                    .catch((error) => console.log(error));
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
                app_cursos.listado();
            })
            .catch((error) => console.log(error));
    };
    this.buscar = () => {
        if (document.getElementById("nombre_search").value != "" || document.getElementById("apellido_search").value != "") {
            var form = new FormData();
            form.append("nombre", document.getElementById("nombre_search").value);
            form.append("apellido", document.getElementById("apellido_search").value);
            fetch("../controllers/buscar_interesado.php", {
                method: "POST",
                body: form,
            })
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
                                <td>${item.direccion + " " + item.numero}</td>
                                <td>${item.localidad}</td>
                                <td>${item.dni}</td>
                                <td>${item.fecharegistro}</td>
                                <td>
                                    <a href="javascript:;" class="btn btn-warning btn-sm" onclick="app.editar(${item.id_interesado})">Editar</a>
                                    <a href="javascript:;" class="btn btn-danger btn-sm" onclick="app.eliminar(${item.id_interesado})">Eliminar</a>
                                </td>
                            </tr>
                        `;
                })})
        } else {
            this.listado();
        }
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
app.listar_cursos();
