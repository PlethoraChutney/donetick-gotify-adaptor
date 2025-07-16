const http = require('http');
const connect = require('connect');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const port = parseInt(process.env.LISTEN_PORT || "52001");
const gotifyEndpoint = process.env.GOTIFY_ENDPOINT;
const gotifyKey = process.env.GOTIFY_KEY;
const gotfiyPriority = parseInt(process.env.GOTIFY_PRIORITY || "5");

const app = connect();
app.use(bodyParser.json());

app.use(async (req, res) => {
    console.log("Input\n", req.body);
    if (req.body.type === "task.reminder") {
        const notifBody = {
            title: "Test notification",
            message: req.body.data,
            priority: gotfiyPriority
        }
        await fetch(
            gotifyEndpoint,
            {
                method: "POST",
                body: JSON.stringify(notifBody),
                headers: {
                    "Content-Type": "application/json",
                    "X-Gotify-Key": gotifyKey
                }
            }
        )
    }

    res.end("SUCCESS\n");
})

const server = http.createServer(app)
    .listen(port);