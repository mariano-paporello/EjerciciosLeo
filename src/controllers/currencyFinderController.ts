import axios from "axios";
import { Request, Response } from "express";


export const currencyFinderController = async (req: Request, res: Response) => {
  try {
    const { pais } = req.body;
    if (pais) {
      const listOfCurrenciesByCode = await getCurrenciesList();
      const listOfCountriesByCode = await getCountriesList();

      const country = listOfCountriesByCode.find(
        (element: { sISOCode: string; sName: string }) => {
          return element.sName.toLowerCase() == pais.toLowerCase();
        }
      );
      if (country && country != (null || undefined)) {
        const currency = listOfCurrenciesByCode.find(
          (element: { sISOCode: string; sName: string }) => {
            const posibleCurrency = element.sISOCode.slice(0, 2);
            return country.sISOCode === posibleCurrency;
          }
        );
        res.status(200).json({
          msg: `La moneda de ${country.sName} es ${currency.sName}`,
        });
      } else {
        res.status(400).json({
          Error: "País no encontrado",
        });
      }
    } else {
      res.status(400).json({
        Error: "Parameter pais needed",
      });
    }
  } catch (error) {
    res.status(400).json({
        Error: error
    })
  }
};

const getCurrenciesList = async () => {
  const listOfCurrenciesByCode = await axios
    .post(
      "http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso/ListOfCurrenciesByCode/JSON/debug?"
    )
    .then((response) => response);
  return listOfCurrenciesByCode.data;
};

const getCountriesList = async () => {
  const listOfCountriesByCode = await axios
    .post(
      "http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso/ListOfCountryNamesByCode/JSON/debug?"
    )
    .then((response) => response);
  return listOfCountriesByCode.data;
};
