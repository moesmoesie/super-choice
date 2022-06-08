import Link from "next/link";
import Image from "./image";
import AppContext from "../lib/contexts/AppContext";
import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import jsCookies from "js-cookie";
import { GB, DE, NL, FR } from "country-flag-icons/react/3x2";

export default function Header({ data, preview }) {
  return (
    <header className="z-50 pointer-events-none w-full">
      <div className="flex z-50 items-center wrapper min-h-[5rem]">
        <Link passHref href="/">
          <a aria-label="Super Choice Logo" className="pointer-events-auto">
            <Image
              alt={"Superchoice Logo"}
              className="z-50 w-16 h-16 relative"
              loading="eager"
              withPlaceholder={false}
              image={data.logo}
              mediaQueries={[{ w: 10, s: 128 }]}
            />
          </a>
        </Link>
        <HamburgerMenu className="z-50 hidden md:flex md:ml-12" />

        <div className="ml-auto mr-8">{/* <LanguagePicker /> */}</div>
        <HamburgerMenu className="z-50 md:hidden" />

        <div className="hidden md:flex gap-8">
          {preview && <ExitPreviewModeButton />}
          <HeaderNavigationLink slug="/contact" title="Contact" />
        </div>
      </div>
    </header>
  );
}

const LanguagePicker = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();

  return (
    <div className="z-50 pointer-events-auto gap-1 flex items-center relative">
      <button
        onClick={(e) => setShow(!show)}
        className="font-bold text-primary4"
      >
        {router.locale.toUpperCase()}
      </button>
      <svg
        width="12"
        height="8"
        viewBox="0 0 12 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.46875 7.03125C5.75 7.3125 6.21875 7.3125 6.5 7.03125L10.75 2.78125C11.0625 2.46875 11.0625 2 10.75 1.71875L10.0625 1C9.75 0.71875 9.28125 0.71875 9 1L5.96875 4.03125L2.96875 1C2.6875 0.71875 2.21875 0.71875 1.90625 1L1.21875 1.71875C0.90625 2 0.90625 2.46875 1.21875 2.78125L5.46875 7.03125Z"
          fill="#007ACC"
        />
      </svg>

      {/* Popup */}

      <AnimatePresence>
        {show && (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="bg-white items-stretch overflow-hidden flex flex-col pointer-events-auto shadow-inner z-50 absolute rounded-md top-full right-0 "
          >
            <li>
              <LanguageButton
                setShow={setShow}
                value="nl"
                title="Nederlands"
                Icon={<NL title="Nederlands" className="w-6" />}
                first={true}
              />
            </li>
            <li>
              <LanguageButton
                setShow={setShow}
                value="en"
                title="English"
                Icon={<GB title="English" className="w-6" />}
              />
            </li>
            <li>
              <LanguageButton
                setShow={setShow}
                value="fr"
                title="Francaise"
                Icon={<FR title="Francaise" className="w-6" />}
              />
            </li>
            <li>
              <LanguageButton
                setShow={setShow}
                value="de"
                title="Deutsch"
                Icon={<DE title="Deutsch" className="w-6" />}
                last={true}
              />
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

import { useRouter } from "next/router";

const LanguageButton = ({ title, value, setShow, Icon }) => {
  const router = useRouter();

  return (
    <>
      {router.locale != value && (
        <button
          className={`whitespace-nowrap pointer-events-auto flex items-center gap-2 z-[60] w-full py-2 px-6 text-left hover:bg-gray-200`}
          onClick={() => {
            jsCookies.set("NEXT_LOCALE", value);
            router.push(router.asPath, undefined, { locale: value });
            setShow(false);
          }}
        >
          {Icon} {title}
        </button>
      )}
    </>
  );
};

const ExitPreviewModeButton = () => {
  return (
    <Link href="/api/exitPreview">
      <a className="link pointer-events-auto hidden sm:block text-primary4 font-bold uppercase">
        Exit Preview
      </a>
    </Link>
  );
};

const HeaderNavigationLink = ({ slug, title }) => {
  const { isMenuOpen } = useContext(AppContext);

  return (
    <motion.a
      href={slug}
      transition={{ type: "easeIn" }}
      animate={
        !isMenuOpen ? { color: "var(--primary4)" } : { color: "#FFFFFF" }
      }
      className="link z-50 cursor-pointer pointer-events-auto hidden sm:block text-primary4 font-bold uppercase"
    >
      {title}
    </motion.a>
  );
};

const HamburgerMenu = (props) => {
  const { isMenuOpen, setIsMenuOpen } = useContext(AppContext);

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <button
      className={`pointer-events-auto flex items-center gap-2 ${props.className}`}
      onClick={isMenuOpen ? closeMenu : openMenu}
    >
      <HamburgerIcon />
      <MenuText />
    </button>
  );
};

const MenuText = () => {
  const { isMenuOpen } = useContext(AppContext);

  const menu = {
    active: {
      translateY: 0,
      opacity: 1,
    },
    nonActive: {
      translateY: -15,
      opacity: 0,
    },
  };

  const close = {
    active: {
      translateY: 0,
      opacity: 1,
    },
    nonActive: {
      translateY: 15,
      opacity: 0,
    },
  };

  return (
    <div className="relative hidden  md:flex items-center">
      <AnimatePresence initial={false}>
        {!isMenuOpen && (
          <motion.span
            transition={{ type: "easeIn" }}
            variants={menu}
            initial="nonActive"
            exit="nonActive"
            animate="active"
            className="absolute sm:inline-block uppercase text-primary4 font-bold p-0 m-0"
          >
            Menu
          </motion.span>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.span
            transition={{ type: "easeIn" }}
            exit="nonActive"
            initial="nonActive"
            animate="active"
            variants={close}
            className="absolute sm:inline-block uppercase text-white font-bold p-0 m-0"
          >
            Close
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

const HamburgerIcon = () => {
  const { isMenuOpen } = useContext(AppContext);

  const topLineVarient = {
    open: {
      rotate: 0,
      translateY: 0,
      stroke: "var(--primary4)",
    },
    close: {
      rotate: 45,
      translateY: 30,
      stroke: "#FFFFFF",
    },
  };

  const middelLineVarient = {
    open: {
      opacity: 1,
    },
    close: {
      opacity: 0,
    },
  };

  const bottomLineVarient = {
    open: {
      rotate: 0,
      translateY: 0,
      stroke: "var(--primary4)",
    },
    close: {
      rotate: -45,
      translateY: -30,
      stroke: "#FFFFFF",
    },
  };

  return (
    <motion.svg viewBox="0 0 100 100" className="w-8 stroke-primary4">
      <motion.line
        variants={topLineVarient}
        initial="open"
        animate={isMenuOpen ? "close" : "open"}
        x1="20"
        y1="20"
        x2="80"
        y2="20"
        strokeWidth={"10"}
      />

      <motion.line
        variants={middelLineVarient}
        animate={isMenuOpen ? "close" : "open"}
        x1="20"
        y1="50"
        x2="80"
        y2="50"
        strokeWidth={"10"}
      />
      <motion.line
        variants={bottomLineVarient}
        animate={isMenuOpen ? "close" : "open"}
        className="origin-left"
        x1="20"
        y1="80"
        x2="80"
        y2="80"
        strokeWidth={"10"}
      />
    </motion.svg>
  );
};
