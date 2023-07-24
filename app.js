const express = require('express')
const server = express()

server.set("view engine", "ejs")

const PORT = process.env.PORT || 8081
const conexion = require('./Databasemodelo/databaseact')
const crud = require('./Controller/crud1')

server.use(express.urlencoded({extended:false})) //express da unos permisos para poder capturar los datos
server.use(express.json()) // el formato que va a usar para leer los datos
server.use(express.static('./databaseact'))    //modelo
server.use(express.static('./Views'))       //vista
server.use(express.static('./Controller'))  //controlador

//vistas
server.get('editardoc1', crud.cargareditardoc)
server.get('/', crud.cargarpaginap)
server.get('/formcitas', crud.cargarformcitas)
server.get('/paglistas', crud.cargarpaglistas)


//rutas doc
server.get('/listadoctores', crud.consultar)
server.get('/formdoctores', (req,res) =>{
    res.render('formdoctores')
})
server.post('/salvar',crud.save)
server.get('/editardoc1/:Cedula',crud.consultardocuno)
server.post('/actualizardoc',crud.actualizardoc)
server.get('/borrardoc/:Cedula',crud.deletedoc)

//rutas pac
server.get('/listapacientes', crud.consultarpacientes)
server.get('/formpacientes', (req,res) =>{
    res.render('formpacientes')
})
server.post('/salvarpaciente',crud.salvarpaciente)
server.get('/editarpac/:Cedula',crud.consultarpacuno)
server.post('/actualizarpac',crud.actualizarpac)
server.get('/borrarpac/:Cedula',crud.deletepac)

//rutas citas
server.get('/listcitasagendadas',crud.consultarcitas)
server.post('/salvarcita',crud.salvarcita)
server.get('/borrarcita/:Numerodocpac',crud.deletecita)

//rutas Api doctores
server.get('/api/doctores',crud.api_consultardoctores)
server.get('/api/doctor/:Cedula',crud.api_consultardoctor)
server.post('/api/agregardoctor',crud.api_agregardoctor)
server.patch('/api/actualizardoctor',crud.api_actulizardoctor)
server.delete('/api/borrardoctor/:Cedula', crud.api_borrardoctor)

//rutas Api pacientes
server.get('/api/pacientes',crud.api_consultarpacientes)
server.get('/api/paciente/:Cedula',crud.api_consultarpaciente)
server.post('/api/agregarpaciente',crud.api_agregarpaciente)
server.patch('/api/actualizarpaciente',crud.api_actulizarpaciente)
server.delete('/api/borrarpaciente/:Cedula',crud.api_borrarpaciente)

//rutas Api citas 
server.get('/api/citas',crud.api_consultarcitas)
server.get('/api/citapaciente/:Numerodocpac',crud.api_consultarunacita)
server.post('/api/agregarcita',crud.api_salvarcita)
server.delete('/api/borrarcita/:Numerodocpac',crud.api_borrarcita)


let serverlisten = server.listen(PORT, () => {
    console.log("servidor funcionando en http://localhost:"+PORT)
})

module.exports = {server, serverlisten}
