const app = new function() {
    this.tbody = document.getElementById("tbody");
    this.cursos_interes = document.getElementById("cursos_interes");
    var localidades = Array();

    this.listado = () => {
        var form = new FormData();
        form.append("cantidad", document.getElementById("cant_listado").value);
        fetch("../controllers/listado.php", {
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
    this.listar_localidades = () => {
        this.localidades = []
        this.localidad_filtro = document.getElementById("localidad_filtro");
        this.localidad_filtro.innerHTML = "";
        fetch("../controllers/listar_localidades.php")
            .then((res) => res.json())
            .then((data) => {
                this.localidad_filtro.innerHTML += `
                    <option value="" selected>Seleccionar localidad</option>
                `
                data.forEach((item) => {
                    this.localidad_filtro.innerHTML += `
                    <option id="curso_interes" value="${item.localidad}" class="curso_interes">${item.localidad}</option>
                    `;
                    this.localidades.push(item.localidad)
                });
            })
            .catch((error) => console.log(error));
    }
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
                    alert("Creado con exito");
                    values.forEach((item) => {
                        cursos_que_esta_interesado.push(item);
                        var form_interes = new FormData();
                        form_interes.append("id_interesado", data['id_interesado']);
                        form_interes.append("id_curso", item);
                        fetch("../controllers/registrar_interes.php", {
                            method: "POST",
                            body: form_interes,
                        })
                            .then((res) => res.json())
                            .then((data) => {
                                alert("Registrado el interes con exito");
                            })
                            .catch((error) => console.log(error));
                    })
                    this.listado();
                    app_cursos.listado();
                    this.listar_localidades();
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
                    this.listar_localidades();
                    this.limpiar();
                })
                .catch((error) => console.log(error));
        }
    };
    this.editar = (id) => {
        this.limpiar();
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
                        let element = document.getElementById("cursos_interes");
                        data.forEach((item) => {
                            element.querySelector("option[value='"+ item.id_curso + "']").selected = true;
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
                this.listar_localidades();
            })
            .catch((error) => console.log(error));
    };
    this.buscar = () => {
        var form = new FormData();
        form.append("nombre", document.getElementById("nombre_search").value);
        form.append("apellido", document.getElementById("apellido_search").value);
        var localidad_elegida = document.getElementById("localidad_filtro").selectedOptions;
        var values = Array.from(localidad_elegida).map(({ value }) => value);
        form.append("localidad", values);
        var form = new FormData();
        form.append("cantidad", document.getElementById("cant_listado").value);
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
                })
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
        let element = document.getElementById("cursos_interes");
        element.querySelector("option").selected = false;
      };
}();
app.listado();
app.listar_cursos();
app.listar_localidades();
