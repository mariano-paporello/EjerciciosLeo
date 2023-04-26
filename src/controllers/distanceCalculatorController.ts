import axios from "axios";
import { Request, Response } from "express";

export const distanceCalculatorController = async (req: Request, res: Response) => {
  try {
    const obeliscoCoordinates = { lat: -34.6037389, lon: -58.3815704 };
    const normalizedDirection = req.body.direccion;

    if (normalizedDirection) {
      const directionArray = normalizedDirection.split(",");
      const data = await getDirection(directionArray).then(
        (response) => response
      );
      if (data.direcciones[0]) {
        const { lat, lon } = data.direcciones[0].ubicacion;

        const distance = findDistance(
          lat,
          lon,
          obeliscoCoordinates.lat,
          obeliscoCoordinates.lon
        );
        if (distance > 5) {
          res.status(200).json({
            msg: "Estas lejos del Obelisco",
          });
        } else if (distance <= 5) {
          res.status(200).json({
            msg: "Estas a menos de 5 Kilómetros del Obelisco",
          });
        }
      } else {
        res.status(400).json({
          Error: "No conozco esa dirección",
        });
      }
    } else {
      res.status(400).json({
        Error: "Parameter direccion needed",
      });
    }
  } catch (error) {
    res.status(400).json({
      Error: error,
    });
  }
};

const findDistance = ( lat: number, lon: number, obeliscoLat: number, obeliscoLon: number ) => {
  const R = 6371;
  const dLat = deg2rad(obeliscoLat - lat);
  const dLon = deg2rad(obeliscoLon - lon);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat)) *
      Math.cos(deg2rad(obeliscoLat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};

const getDirection = async(directionArray:string[])=>{
  const json = await axios
      .get(
        `https://apis.datos.gob.ar/georef/api/direcciones?direccion=${directionArray[0]}&departamento=${directionArray[1]}&provincia=${directionArray[2]}`
      )
    return json.data
}