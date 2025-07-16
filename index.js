const http = require('http');
const connect = require('connect');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const port = parseInt(process.env.LISTEN_PORT || "52001");
const gotifyKey = process.env.GOTIFY_KEY;
const gotifyEndpoint = new URL(process.env.GOTIFY_ENDPOINT);
const gotifyUrl = new URL(`/message?token=${gotifyKey}`, gotifyEndpoint);
const gotfiyPriority = parseInt(process.env.GOTIFY_PRIORITY || "5");

const app = connect();
app.use(bodyParser.json());

app.use(async (req, res) => {
    if (req.body.type === "task.reminder") {
		
        const notifBody = {
            title: `${req.body.data.name} is due`,
            message: "Once you finish it, don't forget to check it off in Donetick!",
            priority: gotfiyPriority
        }
        await fetch(
            gotifyUrl,
            {
                method: "POST",
                body: JSON.stringify(notifBody),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
    }

    res.end("SUCCESS\n");
})

const server = http.createServer(app)
    .listen(port);
