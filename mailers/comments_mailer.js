const nodemailer = require("../config/nodemailer");

exports.newComment = (comment) => {
  let htmlString = nodemailer.renderTemplate(
    { comment: comment },
    "/comments/new_comments.ejs"
  );

  nodemailer.transporter.sendMail(
    {
      from: "vipultechdev@gmail.com", // sender address
      to: comment.user.email, // list of receivers
      subject: "New Comment Published", // Subject line
      //   text: "Hello world?", // plain text body
      html: htmlString, // html body
    },
    function (err, info) {
      if (err) {
        console.log("Error in sending mail", err);
        return;
      }
      console.log("Message Sent", info);
      return;
    }
  );
};

// exports.newComment = async (comment) => {
//   try {
//     console.log("inside newComment mailer");
//     console.log(comment);
//     let htmlString = nodemailer.renderTemplate(
//       { comment: comment },
//       "/comments/newComment.ejs"
//     );
//     const info = await nodemailer.transporter.sendMail({
//       from: "ravkuma78@gmail.com",
//       to: comment.user.email,
//       subject: "new comment published",
//       html: htmlString,
//     });
//     console.log(info);
//     console.log("Message sent!", info);
//     return;
//   } catch (err) {
//     console.log("error in sending mail", err);
//     return;
//   }
// };
