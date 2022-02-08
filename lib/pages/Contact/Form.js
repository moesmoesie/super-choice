import { useState } from "react"
import { motion } from "framer-motion"
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function Form({ className }) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [formState, setFormState] = useState('idle')
    const recaptchaRef = React.createRef();

    const onReCAPTCHAChange = (captchaCode) => {
        if (!captchaCode) {
            setFormState('error')
            return;
        }

        const name = firstName + ' ' + lastName
        sendEmail(name,email,message,captchaCode)
            .then((state) => {
                setFormState(state)
            })
        recaptchaRef.current.reset()
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormState('loading')
        recaptchaRef.current.execute();
    };

    async function sendEmail(name, email, message,captchaCode) {
        if (!validateEmail(email) || !message  ) {
            return 'error'
        }

        const data = {name,email,message,captchaCode}

        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (res.status === 200) {
            return 'succes'
        } else {
            return 'error'
        }
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    return (
        <form className={`grid md:grid-cols-2 gap-5 mb-16 ${className}`}>
            <ReCAPTCHA
                className='absolute'
                ref={recaptchaRef}
                size="invisible"
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                onChange={onReCAPTCHAChange} />
            <ContactFromInput formState={formState} placeholder="First name" onChange={(e) => setFirstName(e.target.value)} />
            <ContactFromInput formState={formState} placeholder="Last name" onChange={(e) => setLastName(e.target.value)} />
            <ContactFromInput formState={formState} className="md:col-span-2" placeholder={"Email address"} onChange={(e) => setEmail(e.target.value)} />
            <ContactFromTextArea formState={formState} className="md:col-span-2" placeholder="Write your message" onChange={(e) => setMessage(e.target.value)} />
            <div className='md:col-span-2'>
                <ContactFromSubmitButton
                    formState={formState}
                    onClick={handleSubmit} />
            </div>
        </form>
    )
}

const ContactFromSubmitButton = ({ onClick, formState }) => {
    const buttonText = {
        'idle': <span>Verstuur</span>,
        'loading': <span className="flex items-center gap-1">
            <svg className="animate-spin" width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.25 3L11.25 6H13.5C13.5 8.4825 11.4825 10.5 9 10.5C8.26722 10.5025 7.5454 10.322 6.9 9.975L5.805 11.07C6.75982 11.6777 7.86821 12.0003 9 12C12.315 12 15 9.315 15 6H17.25L14.25 3ZM4.5 6C4.5 3.5175 6.5175 1.5 9 1.5C9.7575 1.5 10.4775 1.6875 11.1 2.025L12.195 0.93C11.2402 0.322315 10.1318 -0.000314711 9 2.30358e-07C5.685 2.30358e-07 3 2.685 3 6H0.75L3.75 9L6.75 6H4.5Z" fill="white" />
            </svg>
            Versturen
        </span>,
        'error': <span>Probeer het nog eens</span>,
        'succes': <span>Succes!</span>
    }

    const varients = {
        'idle': {
            backgroundColor: '#18A0FB',
            transition: {
                ease: 'linear'
            }
        },
        'loading': {
            backgroundColor: '#FFB01F',
            transition: {
                ease: 'linear'
            }
        },
        'error': {
            backgroundColor: '#FF1F1F',
            transition: {
                ease: 'linear'
            }
        },
        'succes': {
            backgroundColor: '#42DF1B',
            transition: {
                ease: 'linear'
            }
        }
    }






    return (
        <motion.button disabled={formState !== 'idle'} className='px-12 bg-primary3 py-2 items-center text-white rounded-md font-medium'
            variants={varients}
            animate={formState}
            type='submit'
            onClick={onClick}>
            {buttonText[formState]}
        </motion.button>
    )
}

const ContactFromTextArea = ({ placeholder, className, onChange, formState }) => {
    return (
        <textarea className={`${className}
            from-input bg-[#53D8FB]/5 border border-[#66C3FF] rounded-md py-2 px-2
            text-primary3 min-h-[15rem]
            placeholder:text-primary2
            focus:border-primary4 focus:outline-none focus:text-primary4 focus:placeholder:text-primary4`}
            type='text'
            disabled={formState !== 'idle'}
            onChange={onChange}
            placeholder={placeholder}
        />
    )
}

const ContactFromInput = ({ placeholder, className, onChange, formState }) => {
    return (
        <input className={` ${className}
            from-input bg-[#53D8FB]/5 border border-[#66C3FF] rounded-md py-2 px-2
            text-primary3
            placeholder:text-primary2
            focus:border-primary4 focus:outline-none focus:text-primary4 focus:placeholder:text-primary4`}
            type='text'
            disabled={formState !== 'idle'}
            maxLength={25}
            onChange={onChange}
            placeholder={placeholder}
        />
    )
}