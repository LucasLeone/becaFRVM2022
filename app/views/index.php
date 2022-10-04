<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Beca</title>

    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
</head>
<body>
    <div class="container-fluid">
        <div class="row justify-content-center p-5">
            <div class="col-sm-10">
                <h5>Registrar Interesado</h5>
                <hr />
                <form action="javascript:void(0);" onsubmit="app.guardar()">
                    <input type="hidden" id="id_interesado" />
                    <label for="nombre">Nombre</label>
                    <input type="text" class="form-control" id="nombre" placeholder="Nombre" autofocus
                        required />
                    <label for="apellido">Apellido</label>
                    <input type="text" class="form-control" id="apellido" placeholder="Nombre" autofocus
                        required />
                    <label for="telefono">Teléfono</label>
                    <input type="text" class="form-control" id="telefono" placeholder="Telefono" autofocus
                        required />
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" placeholder="email@email.com" 
                        required />
                    <label for="direccion">Dirección</label>
                    <input type="text" class="form-control" id="direccion" placeholder="Dirección" 
                        required />
                    <label for="numero">Número</label>
                    <input type="number" class="form-control" id="numero" placeholder="Número" 
                        required />
                    <label for="localidad">Localidad</label>
                    <input type="text" class="form-control" id="localidad" placeholder="Localidad" 
                        required />
                    <label for="dni">DNI</label>
                    <input type="text" class="form-control" id="dni" placeholder="DNI" 
                        required />
                    <div class="mt-2">
                        <button type="submit" class="btn btn-primary">Guardar</button>
                        <button type="reset" class="btn btn-danger">Cancelar</button>
                    </div>
                </form>
                <br />
                <h5>Listado Interesado</h5>
                <hr />
                <table class="table text-center">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Teléfono</th>
                            <th>Email</th>
                            <th>Dirección</th>
                            <th>Número</th>
                            <th>Localidad</th>
                            <th>DNI</th>
                        </tr>
                    </thead>
                    <tbody id="tbody"></tbody>
                </table>
            </div>
        </div>
    </div>
    <script src="../assets/code.js"></script>
    <!-- Bootstrap -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
</body>
</html>