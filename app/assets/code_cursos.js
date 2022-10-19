const app_cursos = new function() {
    this.tbody = document.getElementById("tbody_cursos");
    this.interesados_por_curso = document.getElementById("interesados_por_curso");
    var cant_cursos = 0;
    // var localidades = app.localidades;

    this.listado = () => {
        fetch("../controllers/listado_curso.php")
            .then((res) => res.json())
            .then((data) => {
                this.tbody.innerHTML = "";
                data.forEach((item) => {
                    cant_cursos += 1;
                    this.listar_interesados_curso(item)
                    this.tbody.innerHTML += `
                    <tr>
                        <td>${item.id_curso}</td>
                        <td>${item.nombre}</td>
                        <td>
                            <a href="javascript:;" class="btn btn-warning btn-sm" onclick="app_cursos.editar(${item.id_curso})">Editar</a>
                            <a href="javascript:;" class="btn btn-danger btn-sm" onclick="app_cursos.eliminar(${item.id_curso})">Eliminar</a>
                        </td>
                    </tr>
                `;
                });
            })
            .catch((error) => console.log(error));
    };
    this.guardar = () => {
        var form = new FormData();
        form.append("nombre", document.getElementById("nombre_curso").value);
        form.append("id_curso", document.getElementById("id_curso").value);
        if (form.get("id_curso") === "") {
            fetch("../controllers/guardar_curso.php", {
                method: "POST",
                body: form,
            })
                .then((res) => res.json())
                .then((data) => {
                    alert("Creado con exito");
                    this.listado();
                    this.limpiar();
                    app.listar_cursos();
                })
                .catch((error) => console.log(error));
        } else {
            fetch("../controllers/actualizar_curso.php", {
                method: "POST",
                body: form,
            })
                .then((res) => res.json())
                .then((data) => {
                    alert("Actualizado con exito");
                    this.listado();
                    this.limpiar();
                    app.listar_cursos();
                })
                .catch((error) => console.log(error));
        }
    };
    this.editar = (id) => {
        var form = new FormData();
        form.append("id", id);
        fetch("../controllers/editar_curso.php", {
            method: "POST",
            body: form,
        })
            .then((res) => res.json())
            .then((data) => {
                document.getElementById("id_curso").value = data.id_curso;
                document.getElementById("nombre_curso").value = data.nombre;
            })
            .catch((error) => console.log(error));
    };
    this.buscar = () => {
        var nombre_curso = document.getElementById("nombrecurso_search").value;
        if (nombre_curso != '') {
            var form = new FormData();
            form.append("nombre", nombre_curso);
            fetch("../controllers/buscar_curso.php", {
                method: "POST",
                body: form,
            })
                .then((res) => res.json())
                .then((data) => {
                    this.tbody.innerHTML = "";
                    data.forEach((item) => {
                        this.tbody.innerHTML += `
                            <tr>
                                <td>${item.id_curso}</td>
                                <td>${item.nombre}</td>
                                <td>
                                    <a href="javascript:;" class="btn btn-warning btn-sm" onclick="app_cursos.editar(${item.id_curso})">Editar</a>
                                    <a href="javascript:;" class="btn btn-danger btn-sm" onclick="app_cursos.eliminar(${item.id_curso})">Eliminar</a>
                                </td>
                            </tr>
                        `;
                    })
                })
                .catch((error) => console.log(error));
        } else {
            this.listado();
        }
    }
    this.eliminar = (id) => {
        var form = new FormData();
        form.append("id", id);
        fetch("../controllers/eliminar_curso.php", {
            method: "POST",
            body: form,
        })
            .then((res) => res.json())
            .then((data) => {
                alert("Eliminado con exito");
                this.listado();
                app.listar_cursos();
            })
            .catch((error) => console.log(error));
    }
    this.limpiar = () => {
        document.getElementById("nombre_curso").value = "";
        document.getElementById("id_curso").value = "";
    };
    this.listar_interesados_curso = (curso) => {
        this.interesados_por_curso.innerHTML = "";
        var form = new FormData();
        form.append("id_curso", curso.id_curso);
        fetch("../controllers/listado_interesados_curso.php", {
            method: "POST",
            body: form,
        })
            .then((res) => res.json())
            .then((data) => {
                this.interesados_por_curso.innerHTML += `
                    <div class="row justify-content-center mt-4">
                        <div>
                            <h5>Curso: "${curso.nombre}"</h5>
                            <hr>
                            <div class="interesados_search">
                                <form action="javascript:void(0);" onsubmit="app_cursos.buscar_interesados_curso(event)" class="d-flex">
                                    <input type="hidden" id="id_curso_buscar_interesado" value="${curso.id_curso}">
                                    <div class="form-group me-2">
                                        <input type="text" class="form-control" id="nombre_interesado_curso_search" placeholder="Nombre" autofocus />
                                    </div>
                                    <div class="form-group me-2">
                                        <input type="text" class="form-control" id="apellido_interesado_curso_search" placeholder="Apellido" autofocus />
                                    </div>
                                    <button class="btn btn-outline-success me-2" type="submit">Buscar</button>
                                    <button class="btn btn-outline-warning" type="reset">Limpiar</button>
                                    <select class="form-select ms-2 w-25" name="localidad_filtro" id="localidad_filtro_interesados${curso.id_curso}">
                                        <option>Seleccionar localidad</option>
                                    </select>
                                </form>
                            </div>
                            <hr>
                            <table class="table text-center">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Teléfono</th>
                                        <th>Email</th>
                                        <th>Dirección</th>
                                        <th>Localidad</th>
                                        <th>DNI</th>
                                    </tr>
                                </thead>
                                <tbody id="interesados_por_curso_datos${curso.id_curso}"></tbody>
                            </table>
                            <nav aria-label="Paginacion de interesados por cursos">
                                <ul class="pagination justify-content-center">
                                    <li class="page-item disabled">
                                        <a class="page-link">Anterior</a>
                                    </li>
                                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                                    <li class="page-item">
                                        <a class="page-link" href="#">Posterior</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                `;
                var localidad_filtro_interesados = document.getElementById("localidad_filtro_interesados"+curso.id_curso);
                fetch("../controllers/listar_localidades.php")
                .then((res) => res.json())
                    .then((data) => {
                        localidad_filtro_interesados.innerHTML += `
                            <option value="" selected>Seleccionar localidad</option>
                        `
                        data.forEach((item) => {
                            localidad_filtro_interesados.innerHTML += `
                                <option id="curso_interes" value="${item.localidad}" class="curso_interes">${item.localidad}</option>
                            `;
                        });
                    })
                    .catch((error) => console.log(error));
                data.forEach((item) => {
                    var form_interesados = new FormData();
                    form_interesados.append("id_interesado", item['id_interesado']);
                    fetch("../controllers/obtener_datos_interesados.php", {
                        method: "POST",
                        body: form_interesados
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            this.interesados_por_curso_datos = document.getElementById("interesados_por_curso_datos"+curso.id_curso);
                            this.interesados_por_curso_datos.innerHTML += `
                                <tr>
                                    <td>${data["id_interesado"]}</td>
                                    <td>${data["nombre"]}</td>
                                    <td>${data["apellido"]}</td>
                                    <td>${data["telefono"]}</td>
                                    <td>${data["email"]}</td>
                                    <td>${data["direccion"] + " " + data["numero"]}</td>
                                    <td>${data["localidad"]}</td>
                                    <td>${data["dni"]}</td>
                                </tr>
                            `;
                        });
                })
            })
    };
    this.buscar_interesados_curso = (event) => {
        event.preventDefault();
        let form = event.currentTarget;
        let formData = new FormData();
        formData.append('id_curso', form.querySelector('#id_curso_buscar_interesado').value);
        formData.append("nombre", form.querySelector('#nombre_interesado_curso_search').value);
        formData.append("apellido", form.querySelector('#apellido_interesado_curso_search').value);
        let localidad_elegida = form.querySelector("#localidad_filtro_interesados"+formData.get('id_curso')).selectedOptions;
        let values = Array.from(localidad_elegida).map(({ value }) => value);
        if (values != 'Seleccionar localidad') {
            formData.append("localidad", values);
        } else {
            formData.append("localidad", "");
        }
        fetch("../controllers/buscar_interesados_curso.php", {
                method: "POST",
                body: formData,
            })
            .then((res) => res.json())
            .then((data) => {
                this.buscar_interesados_por_curso = document.getElementById("interesados_por_curso_datos" + form.querySelector('#id_curso_buscar_interesado').value);
                this.buscar_interesados_por_curso.innerHTML = "";
                data.forEach((item) => {
                    this.buscar_interesados_por_curso.innerHTML += `
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
                                </tr>
                            `;
                })
            })
            .catch((error) => console.log(error));
    };
}
app_cursos.listado();