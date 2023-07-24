const {server, serverlisten} = require('../app')
const request = require('supertest')
const conexion = require('../Databasemodelo/databaseact')

let regInsertdoc
let regInsertpac

beforeEach((done) => {
    conexion.query('DELETE FROM doctores', () => {
        const doctor = [
          { Nombre: 'Laura',Apellido: 'Diaz',
          Cedula: 2222222,
          Especialidad: 'Odontologia',
          Consultorio: 456,
          Email: 'l.diaz@correo.com'  },
          { Nombre: 'Camila ',
          Apellido: 'Sanchez ',
          Cedula: 17890678,
          Especialidad: 'Cardiología',
          Consultorio: 567,
          Email: 'c.sanchez@correo.com' },
          { Nombre: 'E',
          Apellido: 'T',
          Cedula: 53627299,
          Especialidad: 'Medicina general',
          Consultorio: 231,
          Email: 'cor@cor.com' },
        ];
        conexion.query(
            'INSERT INTO doctores (Nombre,Apellido,Cedula,Especialidad,Consultorio,Email) VALUES ?',
          [doctor.map(doctores => Object.values(doctores))],
            () => {
          done();
        });
      });
    });
    

//test de rutas doctores 

describe("Test rutas", () =>{
    test('ruta Pagina principal',async()=>{
        const response = await request(server).get('/').send()
        expect(response.statusCode).toBe(200);
    })
    test('ruta /api/doctores', async () => {
        const response = await request(server).get('/api/doctores').send()
        expect(response.statusCode).toBe(200);
        expect(response.status).toBe(200);
        expect(response.header['content-type']).toMatch("json")
        expect(response.body).toHaveLength(3) //retorna los 3 elementos de base en la tabla 
        expect(response.body).toBeInstanceOf(Array)
    })
    test('test de post agregar doctor', async () => {
        const doctor = {
            Nombre:'Juan',
            Apellido:'Hernandez',
            Cedula:78924567,
            Especialidad: 'Cardiología',
            Consultorio:567,
            Email:'j.hernandez@correo.com'
        }
        const response = await request(server).post('/api/agregardoctor')
        .send(doctor)
        expect(response.status).toBe(200);
        regInsertdoc = response.body.resultado.insertId
    })
    test.skip('test de delete de un doctor', async () => {
        const Cedula = {Cedula:regInsertdoc}
        const response = await request(server).delete('/api/borrardoctor/:Cedula').send(Cedula)
        expect(response.status).toBe(200);
        console.log(response.body.resultado.insertCedula)
    })
})

// test rutas pacientes 
describe("Test rutas pacientes", () =>{
    test('ruta /api/pacientes', async () => {
        const response = await request(server).get('/api/pacientes').send()
        expect(response.statusCode).toBe(200);
        expect(response.status).toBe(200);
        expect(response.header['content-type']).toMatch("json")
        expect(response.body).toHaveLength(3) //retorna los 3 elementos de base en la tabla 
        expect(response.body).toBeInstanceOf(Array)
    })
    test.skip('test de post agregar paciente', async () => {
        const persona = {
            Cedula: 69839303,
            Nombre: "Raul",
            Apellido: "Pira",
            Edad: 45,
            Telefono: 56372820
        }
        const response = await request(server).post('/api/agregardoctor')
        .send(persona)
        expect(response.status).toBe(200);
        regInsertdoc = response.body.resultado.insertCedula
    })
    test.skip('test de delete de un paciente', async () => {
        const Cedulapac = {Cedula:regInsertpac}
        const response = await request(server).delete('/api/borrardoctor/:Cedula').send(Cedulapac)
        expect(response.status).toBe(200);
        console.log(response.body.resultado.insertCedula)
    })
})

//test rutas citas 
describe("Test rutas citas", () =>{
    test('ruta /api/citas', async () => {
        const response = await request(server).get('/api/citas').send()
        expect(response.statusCode).toBe(200);
        expect(response.status).toBe(200);
        expect(response.header['content-type']).toMatch("json")
        expect(response.body).toBeInstanceOf(Array)
    })
})
afterAll(() => {
    serverlisten.close()
    conexion.end()
})