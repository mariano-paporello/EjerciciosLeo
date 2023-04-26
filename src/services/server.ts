import express, { Response , Request, NextFunction} from "express";
import routers from "../routes/index";
import http from "http";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

const app = express();
const publicFolderPath = process.cwd() + '/public';

const errorHandler = (err:any, req:Request, res:Response, next:NextFunction) => {
  console.log(`EXPRESS ==> HUBO UN ERROR ${err} `);
  res.status(500).json({ err: err.message });
};

app.use(express.static(publicFolderPath));
app.use(errorHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerPath = path.resolve(process.cwd(), "./swagger.yml");
const swaggerDoc = YAML.load(swaggerPath);


// Llamo a las API
app.use('/api', routers);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

const myServer = new http.Server(app);

export default myServer;
