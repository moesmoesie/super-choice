export default async function isValidRechaptchaCode(captcha) {
    try {
        const response = await fetch(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                },
                method: "POST",
            }
        );

        const captchaValidation = await response.json();
    
        if (captchaValidation.success) {
            return true
        }else{
            console.log('Invalid Chaptcha code')
            return false
        }

    } catch (error) {
        console.log(error);
        return false
    }
}
