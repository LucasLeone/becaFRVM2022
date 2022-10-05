const app_cursos = new function() {
    this.tbody = document.getElementById("tbody_cursos");

    this.listado = () => {
        fetch("../controllers/listado_curso.php")
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
}();
app_cursos.listado();