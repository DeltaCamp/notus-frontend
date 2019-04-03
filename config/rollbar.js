var Rollbar = require("rollbar")

let instance

if (process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN) {
  instance = new Rollbar({
    accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: process.env.NODE_ENV
    }
  })
} else {
  instance = console
}

export const rollbar = instance
