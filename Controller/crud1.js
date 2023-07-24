const express = require('express')
const conexion = require('../Databasemodelo/databaseact')

//vistas
exports.cargareditardoc = (req,res) => {
    res.render('editardoc1')
}
exports.cargarpaginap = (req,res) => {
    res.render('Pagina principal')
}
exports.cargarformcitas = (req,res) => {
    res.render('formcitas')
}
exports.cargarpaglistas = (req,res) => {
    res.render('paglistas')
}


//crud doc
exports.consultar = (req,res) => {
    conexion.query('select * from doctores',(error, consulta) => {
        if(error){
            console.log("error consultando la tabla doctores: "+ error)
            return
        }
        res.render('listdoctores',{consulta1:consulta})
    })
}

exports.save = (req, res) => {
    const nombredoc = req.body.nombredoc
    const apellidodoc = req.body.apellidodoc
    const ceduladoc = req.body.ceduladoc
    const especialidaddoc = req.body.especialidaddoc
    const consultoriodoc = req.body.consultoriodoc
    const emaildoc = req.body.emaildoc
    var comando = "insert into doctores (Nombre,Apellido,Cedula,Especialidad,Consultorio,Email) values ('"
    comando += nombredoc+ "','"+apellidodoc+"','"+ceduladoc+"','"+especialidaddoc+"','"+consultoriodoc+"','"+emaildoc+"')"
    console.log(comando)
    conexion.query(comando, (error, resultado) => {
        if(error){
            console.log(error)
            return
        } else {
            res.redirect('/')
        }
    })

}

exports.consultardocuno = (req,res) => {
    const cedula = req.params.Cedula
    conexion.query('select * from doctores where Cedula='+cedula,(error, consulta) => {
        if(error){
            console.log("error consultando la cédula de la tabla doctores: "+ error)
            return
        }
        res.render('editardoc1',{doctor:consulta[0]})
    })
}

exports.actualizardoc = (req, res) => {
    const nombredoc = req.body.nombredoc
    const apellidodoc = req.body.apellidodoc
    const ceduladoc = req.body.ceduladoc
    const especialidaddoc = req.body.especialidaddoc
    const consultoriodoc = req.body.consultoriodoc
    const emaildoc = req.body.emaildoc
    var comando = "update doctores set Nombre = '"+nombredoc+"',Apellido= '"+apellidodoc+"',Especialidad = '"+especialidaddoc+"',Email='"+emaildoc+"', Consultorio = "+consultoriodoc
    comando += " where Cedula="+ceduladoc
    conexion.query(comando, (error, resultado) => {
        if(error){
            console.log(error)
            return
        } else {
            res.redirect('/')
        }
    })

}

exports.deletedoc = (req, res) => {
    const ceduladoc = req.params.Cedula
    var comando = "delete from doctores where Cedula="+ceduladoc
    conexion.query(comando, (error, resultado) => {
        if(error){
            console.log(error)
            return
        } else {
            res.redirect('/')
        }
    })

}

//api

exports.api_consultardoctores = (req,res) => {
    conexion.query('select * from doctores',(error, consulta) => {
        if(error){
            console.log("error consultando la tabla doctores: "+ error)
            return
        }
        res.send(consulta)

    })
}

exports.api_consultardoctor = (req,res) => {
    const cedula = req.params.Cedula
    conexion.query('select * from doctores where Cedula='+cedula,(error, consulta) => {
        if(error){
            console.log("error consultando la cédula de la tabla doctores: "+ error)
            return
        }
        res.send(consulta)
    })
}

exports.api_agregardoctor = (req, res) => {
    const nombredoc = req.query.Nombre || req.body.nombredoc
    const apellidodoc = req.query.Apellido || req.body.apellidodoc
    const ceduladoc = req.query.Cedula || req.body.ceduladoc
    const especialidaddoc = req.query.Especialidad || req.body.especialidaddoc
    const consultoriodoc = req.query.Consultorio || req.body.consultoriodoc
    const emaildoc = req.query.Email || req.body.emaildoc
    var comando = "insert into doctores (Nombre,Apellido,Cedula,Especialidad,Consultorio,Email) values ('"
    comando += nombredoc+ "','"+apellidodoc+"','"+ceduladoc+"','"+especialidaddoc+"','"+consultoriodoc+"','"+emaildoc+"')"
    console.log(comando)
    conexion.query(comando, (error, resultado) => {
        if(error){
            console.log(error)
            return
        } else {
            res.send({estado:"OK", resultado:resultado})
        }
    })
}

exports.api_actulizardoctor = (req, res) => {
    const nombredoc = req.query.Nombre || req.body.nombredoc
    const apellidodoc = req.query.Apellido || req.body.apellidodoc
    const ceduladoc = req.query.Cedula || req.body.ceduladoc
    const especialidaddoc = req.query.Especialidad || req.body.especialidaddoc
    const consultoriodoc = req.query.Consultorio || req.body.consultoriodoc
    const emaildoc = req.query.Email || req.body.emaildoc
    var comando = "update doctores set Nombre = '"+nombredoc+"',Apellido= '"+apellidodoc+"',Especialidad = '"+especialidaddoc+"',Email='"+emaildoc+"', Consultorio = "+consultoriodoc
    comando += " where Cedula="+ceduladoc
    conexion.query(comando, (error, resultado) => {
        if(error){
            console.log(error)
            return
        } else {
            res.send('Doctor Actualizado Exitosamente')
        }
    })

}

exports.api_borrardoctor = (req, res) => {
    const ceduladoc = req.query.Cedula ||  req.params.Cedula || req.body.ceduladoc
    var comando = "delete from doctores where Cedula="+ceduladoc+ 
    conexion.query(comando, (error, resultado) => {
        if(error){
            console.log(error)
            return
        } else {
            res.send('Doctor Borrado Exitosamente')
        }
    })
}


//------crud pacientes ----
exports.consultarpacientes = (req,res) => {
    conexion.query('select * from pacientes',(error, consulta) => {
        if(error){
            console.log("error consultando la tabla doctores: "+ error)
            return
        }
        res.render('listpacientes',{consultapac:consulta})
    })
}

exports.salvarpaciente = (req, res) => {
    const cedulapac = req.body.cedulapac
    const nombrepac = req.body.nombrepac
    const apellidopac = req.body.apellidopac
    const edadpac = req.body.edadpac
    const telefonopac = req.body.telefonopac
    var comando = "insert into pacientes (Cedula,Nombre,Apellido,Edad,Telefono) values ('"
    comando += cedulapac+ "','"+nombrepac+"','"+apellidopac+"','"+edadpac+"','"+telefonopac+"')"
    console.log(comando)
    conexion.query(comando, (error, resultado) => {
        if(error){
            console.log(error)
            return
        } else {
            res.redirect('/')
        }
    })

}

exports.consultarpacuno = (req,res) => {
    const cedula = req.params.Cedula
    conexion.query('select * from pacientes where Cedula='+cedula,(error, consulta) => {
        if(error){
            console.log("error consultando la cédula de la tabla doctores: "+ error)
            return
        }
        res.render('editarpac',{paciente:consulta[0]})
    })
}

exports.actualizarpac = (req, res) => {
    const cedulapac = req.body.cedulapac
    const nombrepac = req.body.nombrepac
    const apellidopac = req.body.apellidopac
    const edadpac = req.body.edadpac
    const telefonopac = req.body.telefonopac
    var comando = "update pacientes set Nombre = '"+nombrepac+"',Apellido= '"+apellidopac+"',Edad = "+edadpac+",Telefono="+telefonopac
    comando += " where Cedula="+cedulapac
    conexion.query(comando, (error, resultado) => {
        if(error){
            console.log(error)
            return
        } else {
            res.redirect('/')
        }
    })

}

exports.deletepac = (req, res) => {
    const cedulapac = req.params.Cedula
    var comando = "delete from pacientes where Cedula="+cedulapac
    conexion.query(comando, (error, resultado) => {
        if(error){
            console.log(error)
            return
        } else {
            res.redirect('/')
        }
    })

}

//api pacientes
exports.api_consultarpacientes = (req,res) => {
    conexion.query('select * from pacientes',(error, consulta) => {
        if(error){
            console.log("error consultando la tabla pacientes: "+ error)
            return
        }
        res.send(consulta)

    })
}

exports.api_consultarpaciente = (req,res) => {
    const cedula = req.params.Cedula
    conexion.query('select * from pacientes where Cedula='+cedula,(error, consulta) => {
        if(error){
            console.log("error consultando la cédula de la tabla doctores: "+ error)
            return
        }
        res.send(consulta)
    })
}

exports.api_agregarpaciente = (req, res) => {
    const cedulapac = req.query.Cedula
    const nombrepac = req.query.Nombre
    const apellidopac = req.query.Apellido
    const edadpac = req.query.Edad
    const telefonopac = req.query.Telefono
    var comando = "insert into pacientes (Cedula,Nombre,Apellido,Edad,Telefono) values ('"
    comando += cedulapac+ "','"+nombrepac+"','"+apellidopac+"','"+edadpac+"','"+telefonopac+"')"
    console.log(comando)
    conexion.query(comando, (error, resultado) => {
        if(error){
            console.log(error)
            return
        } else {
            res.send('Paciente agregado Exitosamente')
        }
    })

}

exports.api_actulizarpaciente = (req, res) => {
    const cedulapac = req.query.Cedula
    const nombrepac = req.query.Nombre
    const apellidopac = req.query.Apellido
    const edadpac = req.query.Edad
    const telefonopac = req.query.Telefono
    var comando = "update pacientes set Nombre = '"+nombrepac+"',Apellido= '"+apellidopac+"',Edad = "+edadpac+",Telefono="+telefonopac
    comando += " where Cedula="+cedulapac
    conexion.query(comando, (error, resultado) => {
        if(error){
            console.log(error)
            return
        } else {
            res.send('Paciente Actualizado Exitosamente')
        }
    })

}

exports.api_borrarpaciente = (req, res) => {
    const cedulapac = req.params.Cedula
    var comando = "delete from pacientes where Cedula="+cedulapac
    conexion.query(comando, (error, resultado) => {
        if(error){
            console.log(error)
            return
        } else {
            res.send('Paciente Borrado Exitosamente')
        }
    })
}

//crud citas 

exports.consultarcitas = (req,res) => {
    conexion.query('SELECT A.Numerodocpac as Cedulapac, A.Especialidad as Especialidadreque, B.Nombre as Nombredoc, B.Apellido as Apellidodoc, C.Nombre as Nombrepac, C.Apellido as Apellidopac FROM cita A INNER JOIN doctores B ON B.Especialidad = A.Especialidad INNER JOIN pacientes C ON C.Cedula = A.Numerodocpac',(error, consulta) => {
        if(error){
            console.log("error consultando la tabla doctores: "+ error)
            return
        }
        res.render('listcitasagendadas',{consultacitas:consulta})
    })
}

exports.salvarcita = (req, res) => {
    const cedulapacitas = req.body.cedulapacitas
    const especialidadreque = req.body.especialidadop
    var comando = "insert into cita (Numerodocpac,Especialidad) values ('"
    comando += cedulapacitas+ "','"+especialidadreque+"')"
    console.log(comando)
    conexion.query(comando, (error, resultado) => {
        if(error){
            console.log(error)
            return
        } else {
            res.redirect('/')
        }
    })
}

exports.deletecita = (req, res) => {
    const cedulapacitas = req.params.Numerodocpac
    var comando = "delete from cita where Numerodocpac="+cedulapacitas
    conexion.query(comando, (error, resultado) => {
        if(error){
            console.log(error)
            return
        } else {
            res.redirect('/')
        }
    })

}
// api citas

exports.api_consultarcitas = (req,res) => {
    var comando = 'SELECT A.Numerodocpac as Cedulapac, A.Especialidad as Especialidadreque, B.Nombre as Nombredoc, B.Apellido as Apellidodoc, C.Nombre as Nombrepac, C.Apellido as Apellidopac FROM cita A INNER JOIN doctores B ON B.Especialidad = A.Especialidad INNER JOIN pacientes C ON C.Cedula = A.Numerodocpac'
    conexion.query(comando,(error, consulta) => {
        if(error){
            console.log("error consultando la tabla doctores: "+ error)
            return
        }
        res.send(consulta)
    })
}

exports.api_consultarunacita = (req,res) => {
    const cedulapac = req.params.Numerodocpac
    var comando = 'SELECT A.Numerodocpac as Cedulapac, A.Especialidad as Especialidadreque, B.Nombre as Nombredoc, B.Apellido as Apellidodoc, C.Nombre as Nombrepac, C.Apellido as Apellidopac FROM cita A INNER JOIN doctores B ON B.Especialidad = A.Especialidad INNER JOIN pacientes C ON C.Cedula = A.Numerodocpac WHERE A.Numerodocpac='+cedulapac
    conexion.query(comando,(error, consulta) => {
        if(error){
            console.log("error consultando la tabla doctores: "+ error)
            return
        }
        res.send(consulta)
    })
}

exports.api_salvarcita = (req, res) => {
    const cedulapacitas =req.query.Cedulapac
    const especialidadreque = req.query.Especialidadreque
    var comando = "insert into cita (Numerodocpac,Especialidad) values ('"
    comando += cedulapacitas+ "','"+especialidadreque+"')"
    console.log(comando)
    conexion.query(comando, (error, resultado) => {
        if(error){
            console.log(error)
            return
        } else {
            res.send('Cita Agendada Exitosamente')
        }
    })
}

exports.api_borrarcita = (req, res) => {
    const cedulapacitas = req.params.Numerodocpac
    var comando = "delete from cita where Numerodocpac="+cedulapacitas
    conexion.query(comando, (error, resultado) => {
        if(error){
            console.log(error)
            return
        } else {
            res.send('Cita Borrada Exitosamente')
        }
    })

}