# Donetick Gotify Adaptor

Middleware to convert [Donetick webhooks](https://docs.donetick.com/advance-settings/webhooks)
to [Gotify notifications](https://gotify.net/).
When a task reminder occurs, a Gotify notification will be sent with the task's name in the title.


# Usage

I recommend using docker compose, for example:

```
services:
  gotify:
    image: gotify/server
    container_name: gotify
    restart: unless-stopped
    ports:
      - 52000:80
    volumes:
      - ./data:/app/data
    environment:
      TZ: "America/Los_Angeles"
      GOTIFY_DEFAULTUSER_PASS: "admin"
    networks:
      - gotify
  donetick_adaptor:
    image: ghcr.io/plethorachutney/donetick-gotify-adaptor:latest
    container_name: donetick_adaptor
    restart: unless-stopped
    environment:
      GOTIFY_ENDPOINT: "http://gotify"
      GOTIFY_KEY: << Donetick's Gotify app key >>
    networks:
      - gotify
networks:
  gotify:
```

Be sure to include the `gotify_gotify` network in your Donetick docker installation as well.
Then, set Donetick's webhook URL to `http://donetick_adaptor:52001`.