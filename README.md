# M-shortUrl

A shorten Url service.

## Using 

* Nodejs V10.15.3
* Koa
* MongoDB V4
* Redis V6
* Docker

## Quick Start

### Service Start

```
git clone https://github.com/h091237557/M-shortUrl.git
npm install
docker-compose up
```

### Generate Shorten Url

```
curl -X POST -H "Content-Type: application/json" -d '{"originUrl" : "https://github.com/"}' 127.0.0.1:3000/shortenUrls

{"shortenUrl":"127.0.0.1:3000/shortenUrls/kI"
```

### Redirect Long Url

```
curl 127.0.0.1:3000/shortenUrls/kI

Redirecting to <a href="https://github.com/">https://github.com/</a>
```

### Test

```
npm run test
```

## RESTful API

### POST /shortenUrls

Register a long url and return a shorten url.

#### POST Body

```
Content-Type: application/json
```

```
{
    originUrl <string>: {url}
}

Example:
{
    originUrl: "https://github.com/"
}
```

#### Response

```
Content-Type: application/json
```

```
{
    shortenUrl <string> : {url} 
}

Example:
{
   shortenUrl: "127.0.0.1:3000/shortenUrls/kI"
}
```

### GET /shortenUrls/{shortenKey}

Redirect to the origin url with 302 http code.


