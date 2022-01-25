import { useContext } from "react";
import { useEffect } from "react";
import AppContext from "../lib/contexts/AppContext";
import anime from "animejs";

export default function Menu({ data }) {
    const { isMenuOpen} = useContext(AppContext);
    useEffect(() => {
        if (isMenuOpen) {
            anime({
                targets: ".menu",
                translateY: 0,
                duration: 200,
                easing: 'cubicBezier(.5, .05, .1, .3)'
            });
        } else {
            anime({
                targets: ".menu",
                translateY: "-100%",
                duration: 200,
                easing: 'cubicBezier(.5, .05, .1, .3)'
            });
        }
    });
    
    return (
        <div className={`menu z-50 w-screen h-screen bg-slate-900 fixed animate-none`} style={{ transform: "translateY(-100%)" }}>
        </div>
    )
}