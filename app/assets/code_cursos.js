const app_cursos = new function() {
    this.tbody = document.getElementById("tbody_cursos");
    this.interesados_por_curso = document.getElementById("interesados_por_curso");

    this.listado = () => {
        fetch("../controllers/listado_curso.php")
            .then((res) => res.json())
            .then((data) => {
                this.tbody.innerHTML = "";
                data.forEach((item) => {
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
            })
            .catch((error) => console.log(error));
    }
    this.limpiar = () => {
        document.getElementById("nombre_curso").value = "";
        document.getElementById("id_curso").value = "";
    };
    this.listar_interesados_curso = (curso) => {
        var form = new FormData();
        form.append("id_curso", curso.id_curso);
        fetch("../controllers/listado_interesados_curso.php", {
            method: "POST",
            body: form,
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                this.interesados_por_curso.innerHTML += `
                    <div class="row justify-content-center p-5 col-sm-10">
                        <div>
                            <h5>Curso: "${curso.nombre}"</h5>
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
                                <tbody id="interesados_por_curso_datos"></tbody>
                            </table>
                        </div>
                    </div>
                `;
                this.interesados_por_curso_datos = document.getElementById("interesados_por_curso_datos");
                data.forEach((item) => {
                    this.interesados_por_curso_datos.innerHTML += `
                                    <tr>
                                        <td>${item.id_interesado}</td>
                                        <td>${item.nombre}</td>
                                        <td>${item.apellido}</td>
                                        <td>${item.telefono}</td>
                                        <td>${item.email}</td>
                                        <td>${item.direccion + " " + item.numero}</td>
                                        <td>${item.localidad}</td>
                                        <td>${item.dni}</td>
                                    </tr>
                `;
                });
            })
    }
}();
app_cursos.listado();