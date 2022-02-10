let nodemailer = require('nodemailer')

export function getEmailHtml(email,message){
    return `<div>${message}</div>
    <p>Sent from: ${email}</p>
    `
}

export function createTransporter(email,password){
    return nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
            user: email ,
            pass: password
        },
        secure: true,
    });
}

export function createSubject(name,company){
    if(name && company){
        return `Message From ${name} at company ${company}. Super Choice contact form.`
    }else{
        return `Message From ${name}. Super Choice contact form.`
    }
}

export async function sendEmail(transporter,data){
    let info = await transporter.sendMail(data)
    return info
}