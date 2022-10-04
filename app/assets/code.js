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
                            <a href="javascript:;" class="btn btn-warning btn-sm" onclick="app.editar(${item.id})"></a>
                            <a href="javascript:;" class="btn btn-danger btn-sm" onclick="app.eliminar(${item.id})"></a>
                        </td>
                    </tr>
                `;
                });
            })
            .catch((error) => console.log(error));
    }
}();
app.listado();