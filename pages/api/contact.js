export default async function (req, res) {
    return new Promise((resolve, reject) => {
        let nodemailer = require('nodemailer')
        const transporter = nodemailer.createTransport({
            port: 465,
            host: "smtp.gmail.com",
            auth: {
                user: 'super.choice.contact@gmail.com',
                pass: process.env.EMAIL_PASSWORD,
            },
            secure: true,
        });

        const mailData = {
            from: 'super.choice.contact@gmail.com',
            to: 'super.choice.contact@gmail.com',
            subject: `Message From ${req.body?.firstName} ${req.body?.lastName}`,
            text: req.body?.message + " | Sent from:" + req.body?.email,
            replyTo: req.body?.email,
            html: `<div>${req.body?.message}</div><p>Sent from: ${req.body?.email}</p>`
        }

        transporter.sendMail(mailData, function (err, info) {
            if (err) {
                res.statusCode = 500
                res.end(JSON.stringify({ succes: 'false' }));
                resolve()
            } else {
                res.statusCode = 200
                res.end(JSON.stringify({ succes: 'true' }));
                resolve()
            }
        })
    });
}