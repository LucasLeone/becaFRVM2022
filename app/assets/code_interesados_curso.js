const app_interesado_curso = new function() {
    this.tbody = document.getElementById("tbody_interesados_curso");

    this.listado = () => {
        fetch("../controlles/listado_interesado_curso.php")
            .then((res) => res.json())
            .then((data) => {
                this.tbody.innerHTML = "";
                data.forEach((item) => {
                    this.tbody.innerHTML += `
                    <tr>
                        <td>
                    `
                })
            })
    }
}