import { useState } from "react"

export default function ({ className }) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [submitted, setSubmitted] = useState(false)

    async function fromSubmit(e) {
        e.preventDefault();
        alert(`
            First Name: ${firstName}
            Last Name: ${lastName}
            Email: ${email}
            Message: ${message}
        `)
        return false
    }

    return (
        <form className={`grid md:grid-cols-2 gap-5 mb-16 ${className}`}>
            <ContactFromInput placeholder="First name" onChange={(e) => setFirstName(e.target.value)} />
            <ContactFromInput placeholder="Last name" onChange={(e) => setLastName(e.target.value)} />
            <ContactFromInput className="md:col-span-2" placeholder={"Email address"} onChange={(e) => setEmail(e.target.value)} />
            <ContactFromTextArea className="md:col-span-2" placeholder="Write your message" onChange={(e) => setMessage(e.target.value)} />
            <div className='md:col-span-2'>
                <ContactFromSubmitButton onClick={fromSubmit} />
            </div>
        </form>
    )
}

const ContactFromSubmitButton = ({ onClick }) => {
    return (
        <button className='bg-primary3 px-12 py-2 text-white rounded-md font-medium'
            type='submit'
            onClick={onClick}>
            Verstuur
        </button>
    )
}

const ContactFromTextArea = ({ placeholder, className, onChange }) => {
    return (
        <textarea className={`${className}
            from-input bg-[#53D8FB]/5 border border-[#66C3FF] rounded-md py-2 px-2
            text-primary3 min-h-[15rem]
            placeholder:text-primary2
            focus:border-primary4 focus:outline-none focus:text-primary4 focus:placeholder:text-primary4`}
            type='text'
            onChange={onChange}
            placeholder={placeholder}
        />
    )
}

const ContactFromInput = ({ placeholder, className, onChange }) => {
    return (
        <input className={` ${className}
            from-input bg-[#53D8FB]/5 border border-[#66C3FF] rounded-md py-2 px-2
            text-primary3
            placeholder:text-primary2
            focus:border-primary4 focus:outline-none focus:text-primary4 focus:placeholder:text-primary4`}
            type='text'
            maxLength={25}
            onChange={onChange}
            placeholder={placeholder}
        />
    )
}