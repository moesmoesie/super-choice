import anime from "animejs";
import Link from "next/link";
import Image from "./image";
import AppContext from '../lib/contexts/AppContext';
import { useContext, useEffect } from 'react';
import { playOpenMenuAnimation, playCloseMenuAnimation } from '../lib/animations/MenuAnimations';

export default function Header({ data, preview }) {
    return (
        <header className="top-0 z-50 pointer-events-none w-full bg-white sticky ">
            <div className='flex items-center wrapper min-h-[4rem]'>
                <Link href='/'>
                    <a className='pointer-events-auto'>
                        <Image className="w-12 aspect-square relative" loading='eager' withPlaceholder={false} image={data.logo} sizes={[180]} />
                    </a>
                </Link>
                <HamburgerMenu className='ml-auto sm:ml-12' />
                <div className="ml-auto flex gap-x-10">
                    {preview && <ExitPreviewModeButton />}
                    <HeaderNavigationLink slug="/contact" title="contact" />
                </div>
            </div>
        </header>
    )
}

const ExitPreviewModeButton = () => {
    return (
        <Link href='/api/exitPreview'>
            <a className="link pointer-events-auto hidden sm:block text-primary4 font-bold uppercase">
                Exit Preview
            </a>
        </Link>
    )
}

const HeaderNavigationLink = ({ slug, title }) => {
    const { isMenuOpen } = useContext(AppContext);

    useEffect(() => {
        if (isMenuOpen) {
            anime({
                targets: ".link",
                color: "#FFFFFF",
                duration: 500
            });
        } else {
            anime({
                targets: ".link",
                color: "#007ACC",
                duration: 500
            });
        }
    });

    return (
        <Link href={slug}>
            <a className="link pointer-events-auto hidden sm:block text-primary4 font-bold uppercase">
                {title}
            </a>
        </Link>
    )
}

const HamburgerMenu = (props) => {
    const { isMenuOpen, setIsMenuOpen } = useContext(AppContext);

    const openMenu = () => {
        setIsMenuOpen(true)
        playOpenMenuAnimation()
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
        playCloseMenuAnimation()
    }

    return (
        <button className={`pointer-events-auto flex items-center gap-2 ${props.className}`}
            onClick={isMenuOpen ? closeMenu : openMenu}>
            <svg viewBox="0 0 100 100" className="w-8 stroke-primary2">
                <line className="HamburgerMenuTopLine origin-left" x1="20" y1="20" x2="80" y2="20" strokeWidth={"10"} />
                <line className="HamburgerMenuMiddelLine" x1="20" y1="50" x2="80" y2="50" strokeWidth={"10"} />
                <line className="HamburgerMenuBottomLine origin-left" x1="20" y1="80" x2="80" y2="80" strokeWidth={"10"} />
            </svg>
            <div className='relative flex items-center'>
                <span className="hamburgerOpenText absolute hidden sm:inline-block uppercase text-primary4 font-bold p-0 m-0" >Menu</span>
                <span className="hamburgerCloseText opacity-0 absolute hidden sm:inline-block uppercase text-white font-bold p-0 m-0" >Close</span>
            </div>
        </button>
    )
}