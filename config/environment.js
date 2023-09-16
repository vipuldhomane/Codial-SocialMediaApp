const fs = require("fs");
const rfs = require("rotating-file-stream");
const path = require("path");

const logDirectory = path.join(__dirname, "../production_logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory); // crete the folder if it does not exists

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: logDirectory,
});

const development = {
  name: "development",
  asset_path: "./assets",
  session_cookie_key: "Blahsomething",
  db: "codial_development",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.CODIAL_AUTH_USER,
      pass: process.env.CODIAL_AUTH_PASS, // generate this password from the gmail two factor settings
      // this wont accept the normal password as google don't allow to use smtp for security reasons
    },
  },
  google_client_id:
    "507267631010-p1hu0cth0oje04oa6q7olcb7d6r5j7ca.apps.googleusercontent.com",
  google_client_secret: "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",
  google_callback_url: "http://localhost:8000/users/auth/google/callback",
  morgan: {
    mode: "dev",
    options: {
      stream: accessLogStream,
    },
  },

  jwt_secret: "codial",
};
const production = {
  name: "development",
  asset_path: process.env.CODIAL_ASSETS_PATH,
  session_cookie_key: process.env.CODIAL_SESSION_COOKIE_KEY,
  db: process.env.CODIAL_DB,
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.CODIAL_AUTH_USER,
      pass: process.env.CODIAL_AUTH_PASS, // generate this password from the gmail two factor settings
      // this wont accept the normal password as google don't allow to use smtp for security reasons
    },
  },
  google_client_id: process.env.CODIAL_GOOGLE_CLIENT_ID,
  google_client_secret: process.env.CODIAL_GOOGLE_CLIENT_SERVER,
  google_callback_url: process.env.CODIAL_GOOGLE_CALLBACKURL,
  morgan: {
    mode: "combined",
    options: {
      stream: accessLogStream,
    },
  },

  jwt_secret: process.env.CODIAL_JWT_KEY,
};

module.exports =
  eval(process.env.NODE_ENV) == undefined
    ? development
    : eval(process.env.NODE_ENV);

console.log(process.env.NODE_ENV);

// module.exports = development;
