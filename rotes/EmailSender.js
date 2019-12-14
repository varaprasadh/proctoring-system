
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