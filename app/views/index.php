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
        <!-- INTERESADOS -->
        <div class="row justify-content-center p-5">
            <div class="col-sm-10">
                <h5>Registrar Interesado</h5>
                <hr />
                <form action="javascript:void(0);" onsubmit="app.guardar()">
                    <div class="inputs" style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 5px; align-items: center;">
                        <input type="hidden" id="id_interesado" />
                        <div class="form-group">
                            <label for="nombre">Nombre</label>
                            <input type="text" class="form-control" id="nombre" placeholder="Nombre" autofocus
                                required />
                        </div>
                        <div class="form-group">
                            <label for="apellido">Apellido</label>
                            <input type="text" class="form-control" id="apellido" placeholder="Apellido" autofocus
                                required />
                        </div>
                        <div class="form-group">
                            <label for="telefono">Teléfono</label>
                            <input type="text" class="form-control" id="telefono" placeholder="Telefono" autofocus
                                required />
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" class="form-control" id="email" placeholder="email@email.com" 
                                required />
                        </div>
                        <div class="form-group">
                            <label for="direccion">Dirección</label>
                            <input type="text" class="form-control" id="direccion" placeholder="Dirección" 
                                required />
                        </div>
                        <div class="form-group">
                            <label for="numero">Número</label>
                            <input type="number" class="form-control" id="numero" placeholder="Número" 
                                required />
                        </div>
                        <div class="form-group">
                            <label for="localidad">Localidad</label>
                            <input type="text" class="form-control" id="localidad" placeholder="Localidad" 
                                required />
                        </div>
                        <div class="form-group">
                            <label for="dni">DNI</label>
                            <input type="text" class="form-control" id="dni" placeholder="DNI" 
                                required />
                        </div>
                        <div class="form-group d-grid">
                            <label for="cursos_interes">Cursos interes</label>
                            <select class="form-select" name="cursos_interes" id="cursos_interes" multiple>
                            </select>
                        </div>
                    </div>
                    <div class="mt-2 d-flex">
                        <button type="submit" class="btn btn-primary me-1">Guardar</button>
                        <button type="reset" class="btn btn-danger">Cancelar</button>
                    </div>
                </form>
                <br />
                <h5>Listado Interesado</h5>
                <hr />
                <div class="interesados_search">
                    <form action="javascript:void(0);" onsubmit="app.buscar()" class="d-flex">
                        <div class="form-group me-2">
                            <input type="text" class="form-control" id="nombre_search" placeholder="Nombre" autofocus />
                        </div>
                        <div class="form-group me-2">
                            <input type="text" class="form-control" id="apellido_search" placeholder="Apellido" autofocus />
                        </div>
                        <button class="btn btn-outline-success me-2" type="submit">Buscar</button>
                        <button class="btn btn-outline-warning" type="reset">Limpiar</button>
                    </form>
                </div>
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
                            <th>Localidad</th>
                            <th>DNI</th>
                            <th>Fecha Registro</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="tbody"></tbody>
                </table>
            </div>
        </div>
        <!-- CURSOS -->
        <div class="row justify-content-center p-5">
            <div class="col-sm-10">
                <h5>Registrar Curso</h5>
                <hr />
                <form action="javascript:void(0);" onsubmit="app_cursos.guardar()">
                    <div class="inputs" style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 5px; align-items: center;">
                        <input type="hidden" id="id_curso" />
                        <div class="form-group">
                            <label for="nombre_curso">Nombre</label>
                            <input type="text" class="form-control" id="nombre_curso" placeholder="Nombre" autofocus
                                required />
                        </div>
                    </div>
                    <div class="mt-2 d-flex">
                        <button type="submit" class="btn btn-primary me-1">Guardar</button>
                        <button type="reset" class="btn btn-danger">Cancelar</button>
                    </div>
                </form>
                <br />
                <h5>Listado Cursos</h5>
                <hr />
                <div class="cursos_search">
                    <form action="javascript:void(0);" onsubmit="app_cursos.buscar()" class="d-flex">
                        <div class="form-group me-2">
                            <input type="text" class="form-control" id="nombrecurso_search" placeholder="Nombre" autofocus />
                        </div>
                        <button class="btn btn-outline-success me-2" type="submit">Buscar</button>
                        <button class="btn btn-outline-warning" type="reset">Limpiar</button>
                    </form>
                </div>
                <hr>
                <table class="table text-center">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="tbody_cursos"></tbody>
                </table>
            </div>
        </div>
        <!-- LISTADO INTERESADOS POR CURSO -->
        <div class="row justify-content-center p-5">
            <div class="col-sm-10">
                <h5>Interesados por curso</h5>
            </div>
            <div id="interesados_por_curso" class="col-sm-10">
                
            </div>
        </div>
    </div>
    <script src="../assets/code.js"></script>
    <script src="../assets/code_cursos.js"></script>
    <!-- Bootstrap -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
</body>
</html>