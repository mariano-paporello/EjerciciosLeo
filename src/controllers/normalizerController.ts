import {Response, Request } from "express";
import axios from "axios"


export const normalizeStreetController = async(req:Request, res:Response)=>{
    try {
        if(req.body){
            const {calle, provincia, altura, departamento} = req.body
    
        if(calle&&provincia&&altura){
            if(departamento){
                const data = await findStreetWithDepartment(calle,altura,departamento,provincia)
                if(data.direcciones.length===1){
                    res.status(200).json({
                        msg: data.direcciones[0].nomenclatura
                    })
                }
                else if(data.direcciones.length>0){
                    res.status(200).json({
                        msg: data.direcciones.map(
                            (element:any)=>`Localidad con esa calle: ${element.localidad_censal.nombre}. Departamento de esa localidad: ${element.departamento.nombre}`
                        )
                    })
                }else{
                    res.status(400).json({
                        Error: "Street not found"
                    })
                }
            }else{
                const data = await findStreet(calle, altura, provincia)
            if(data.direcciones.length===1){
                res.status(200).json({
                    msg: data.direcciones[0].nomenclatura
                })
            }
            else if(data.direcciones.length>0){
                res.status(200).json({
                    msg: data.direcciones.map(
                        (element:any)=>`Localidad con esa calle: ${element.localidad_censal.nombre}. Departamento de esa localidad: ${element.departamento.nombre}`
                    )
                })
            }else{
                res.status(400).json({
                    Error: "Street not found"
                })
            }
            }
        }else{
                res.status(400).json({
                    Error: "Parameters not entered correctly"
                }) 
            }
        }
    }  catch (error) {
        res.status(400).json({
            Error: `Error: ${error}`
        })
    }
    
    
}

const findStreet = async(calle:string, altura:number, provincia:string)=>{
    const json=  await axios.get(`https://apis.datos.gob.ar/georef/api/direcciones?direccion=${calle} ${altura}&provincia=${provincia}`).then(response=>response)
    return json.data
}

const findStreetWithDepartment= async(calle:string, altura:number, departamento:string, provincia:string)=>{
    const json=  await axios.get(
        `https://apis.datos.gob.ar/georef/api/direcciones?direccion=${calle} ${altura}&departamento=${departamento}&provincia=${provincia}`
        ).then(response=>response)
    return json.data
}