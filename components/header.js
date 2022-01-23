import { useState } from 'react';
import anime from "animejs";
import Link from "next/link";
import Image from "./image";

export default function Header({data}) {
    return (
        <header className="top-0 z-50 pointer-events-none w-full bg-white absolute ">
            <div className='flex items-center wrapper min-h-[4rem]'>
                <Image className="w-12 aspect-square relative" loading='eager' withPlaceholder={false} image={data.logo} sizes={[48]}/>
                <HamburgerMenu className='ml-auto sm:ml-12' />
                <HeaderNavigationLink slug="/" title="contact" />
            </div>
        </header>
    )
}

const HeaderNavigationLink = ({slug, title }) => {
    return (
        <Link href={slug}>
            <a className="pointer-events-auto hidden sm:block ml-auto text-primary4 font-bold uppercase">
                {title}
            </a>
        </Link>
    )
}

const HamburgerMenu = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const openHamburger = () => {
        setIsOpen(true)
        anime({
            targets: ".HamburgerMenuTopLine",
            y2: "80",
            duration: 500
        });

        anime({
            targets: ".HamburgerMenuMiddelLine",
            opacity: "0",
            duration: 500
        });

        anime({
            targets: ".HamburgerMenuBottomLine",
            y2: "20",
            duration: 500
        });
    }

    const closeHamburger = () => {
        setIsOpen(false)
        anime({
            targets: ".HamburgerMenuTopLine",
            y2: "20",

            duration: 500
        });

        anime({
            targets: ".HamburgerMenuMiddelLine",
            opacity: "1",
            duration: 500
        });

        anime({
            targets: ".HamburgerMenuBottomLine",
            y2: "80",
            duration: 500
        });
    }

    return (
        <button className={`pointer-events-auto flex items-center gap-2 ${props.className}`}
            onClick={isOpen ? closeHamburger : openHamburger}>
            <svg viewBox="0 0 100 100" className="w-8 stroke-primary2">
                <line className="HamburgerMenuTopLine origin-left" x1="20" y1="20" x2="80" y2="20" strokeWidth={"10"} />
                <line className="HamburgerMenuMiddelLine" x1="20" y1="50" x2="80" y2="50" strokeWidth={"10"} />
                <line className="HamburgerMenuBottomLine origin-left" x1="20" y1="80" x2="80" y2="80" strokeWidth={"10"} />
            </svg>
            <span className="hidden sm:inline-block uppercase text-primary4 font-bold p-0 m-0" >Menu</span>
        </button>
    )
}