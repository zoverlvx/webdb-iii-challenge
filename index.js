const server = require("./api/server");
const PORT = process.env.PORT;

server.get("/", (req, res) => {
    res.send("API is up");
});

server.listen(PORT, () => {
    console.log(`Web API listening on port: ${PORT}`);
});
