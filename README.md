# Vacation Now / booking-proxy

> Proxy server for the listing page of a vacation rental website

## Related Projects

  - https://github.com/HRR47-SDC-Burke/booking-service
  - https://github.com/HRR47-SDC-Burke/carousel-service
  - https://github.com/HRR47-SDC-Burke/reviews-service

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)
4. [Production](#production)
5. [Screenshot](#screenshot)

## Usage

> Example URL: http://localhost:3002/25

## Requirements

- Node v12.18.1

## Development

> All commands from within the repository's root directory.

### Installing Dependencies

```sh
npm install
```
### Development Server

```sh
npm run start:dev
```

## Production

### Environment Variables
> If you do not have the environment variables set up via shell, you can create
> a `.env` file in the repository's root folder to load them.

```sh
BOOKING_SERVICE_URL=<booking-service-url> # http://127.0.0.1:3002
IMAGES_SERVICE_URL=<carousel-images-service-url> # http://127.0.0.1/3001
REVIEWS_SERVICE_URL=<reviews-service-url> # http://127.0.0.1/3003
NEW_RELIC_LICENSE_KEY=<your-new-relic-license-key>
CLOUD_STYLE_URL=<your-cloud-bucket-url> # https://x.amazonaws.com/sdc-proxy
```

### Node Server

```sh
npm start
```

### Hosting Assets on Cloud
> Requires [Grunt](https://gruntjs.com/) and the dev dependencies to be installed

- Create the grunt-aws.json file at $HOME/.aws directory
  ```sh
  {
    "accessKeyId": "<your-access-keyId>",
    "secretAccessKey": "<your-access-secret>",
    "bucket": "<your-bucket-name>"
  }
  ```
- Add `CLOUD_STYLE_URL=<your-cloud-bucket-url>` to the environment variables

- Run $ `grunt` on the terminal

## Screenshot
![Screenshot](./docs/screenshot.png?raw=true "Screenshot")
