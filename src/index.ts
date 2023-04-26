import server from "./services/server";

server.listen(8080, () => {
    console.log("Server is running on port 8080");
});

server.on('error', (err:any) => {
    console.log(`EXPRESS ==> SERVER ERROR: ${err} `, err);
});

process.on('exit', (code:number) => {
    console.log(`NODE ==> El proceso termino con codigo ${code}\n\n`);
});