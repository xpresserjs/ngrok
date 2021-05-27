const { init } = require("xpresser");

const $ = init({
    name: "Test Ngrok plugin",
    env: "development",
    paths: { base: __dirname, jsonsFolder: __dirname, backend: __dirname }
});

$.on.start((next) => {
    $.config.set("server.use.ngrok", true);
    return next();
});

$.on.boot((next) => {
    $.router.get("/", (http) =>
        http.send({
            message: "Hello World",
            url: http.req.url
        })
    );
    return next();
});

$.boot();
