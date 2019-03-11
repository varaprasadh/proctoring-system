// const nodemailer = require('nodemailer');

// let transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: false,
//     requireTLS: true,
//     auth: {
//         user: 'varaprasadh.a@gmail,com',
//       
//     }
// });

// let mailOptions = {
//     from: 'varaprasadh.a@gmail.com',
//     to: 'rajeevgsd@gmail.com',
//     subject: 'you got 1M dollors',
//     text: 'send your bank details'
// };

// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         return console.log(error.message);
//     }
//     console.log('success');
// });
const sendmail = require('sendmail')();

sendmail({
    from: 'varaprasadh.a@gmail.com',
    to: 'varaprasadh.a@gmail.com',
    subject: 'test sendmail',
    html: 'Mail of test sendmail ',
}, function(err, reply) {
    console.log(err && err.stack);
    console.dir(reply);
});