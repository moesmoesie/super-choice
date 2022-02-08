import { getEmailHtml, createTransporter, createSubject, sendEmail } from './email';
import isValidRechaptchaCode from './reCaptcha';

export default async function (req, res) {
    const { body, method } = req;

    if (method !== 'POST') {
        return res.status(404).send("Not found");
    }

    const { name, email, message, captchaCode } = body

    if (!email || !message || !captchaCode) {
        return res.status(422).json({
            message: "Unproccesable request, please provide the required fields",
        });
    }

    const isValidCode = await isValidRechaptchaCode(captchaCode)

    if (!isValidCode) {
        return res.status(422).json({
            message: "Unproccesable request, Invalid captcha code",
        });
    }

    const { EMAIL_PASSWORD, EMAIL_USER } = process.env

    if (!EMAIL_USER || !EMAIL_PASSWORD) {
        return res.status(500).json({
            message: 'Failed to send email!'
        })
    }

    const transporter = createTransporter(EMAIL_USER, EMAIL_PASSWORD)

    const mailData = {
        from: EMAIL_USER,
        to: EMAIL_USER,
        subject: createSubject(name),
        replyTo: email,
        html: getEmailHtml(email, message)
    }

    try {
        await sendEmail(transporter, mailData)
        return res.status(200).json({
            message: 'Succesfully send email!'
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Failed to send email!'
        })
    }
}