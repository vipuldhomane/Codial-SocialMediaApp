const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const env = require("./environment");
const transporter = nodemailer.createTransport(env.smtp);

const renderTemplate = (data, relativePath) => {
  let mailHTML;
  ejs.renderFile(
    path.join(__dirname, "../views/mailers", relativePath), // appending the path to the relativePath

    data,
    function (err, template) {
      if (err) {
        console.log("error in rendering template");
        return;
      }
      mailHTML = template;
    }
  );
  return mailHTML;
};

module.exports = {
  transporter: transporter,
  renderTemplate: renderTemplate,
};
