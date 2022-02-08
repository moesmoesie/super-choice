import { getEmailHtml, createTransporter, createSubject, sendEmail} from './email';

export default async function (req, res) {
    const { EMAIL_PASSWORD, EMAIL_USER } = process.env

    if (!EMAIL_USER) {
        return res.status(500).json({
            error: 'Failed to send email!'
        })
    }

    if (!EMAIL_PASSWORD) {
        return res.status(500).json({
            error: 'Failed to send email!'
        })
    }

    const {firstName, lastName, email, message } = req.body
    const name = `${firstName} ${lastName}`

    if(!email && !message){
        return res.status(500).json({
            error: 'Failed to send email!'
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
        await sendEmail(transporter,mailData)
        return res.status(200).json({
            body: 'Succesfully send email!'
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Failed to send email!'
        })
    }
}