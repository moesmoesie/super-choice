import anime from "animejs"

const DURATION = 500


export const playOpenMenuAnimation = () => {

    // Open Hamburger
    anime({
        targets: ".HamburgerMenuTopLine",
        y2: 80,
        duration: DURATION,
        stroke: '#ffffff',
    });

    anime({
        targets: ".HamburgerMenuMiddelLine",
        opacity: 0,
        duration: DURATION,
        stroke: '#ffffff'
    });

    anime({
        targets: ".HamburgerMenuBottomLine",
        y2: 20,
        duration: DURATION,
        stroke: '#ffffff'
    });

    // Change Hamburger Text
    anime({
        targets: ".hamburgerOpenText",
        opacity: 0,
        duration: DURATION
    });

    anime({
        targets: ".hamburgerCloseText",
        translateY: [-10, 0],
        opacity: [0, 1],
        duration: DURATION
    });

    // Show Menu
    anime({
        targets: ".menu",
        translateY: 0,
        duration: 200,
        easing: 'cubicBezier(.5, .05, .1, .3)'
    });
}

export const playCloseMenuAnimation = () => {
    
    // Open Hamburger
    anime({
        targets: ".HamburgerMenuTopLine",
        y2: 20,
        duration: 500,
        stroke: "#66C3FF"
    });

    anime({
        targets: ".HamburgerMenuMiddelLine",
        opacity: 1,
        duration: 500,
        stroke: "#66C3FF"
    });

    anime({
        targets: ".HamburgerMenuBottomLine",
        y2: 80,
        duration: 500,
        stroke: "#66C3FF"
    });

    // Change Hamburger Text
    anime({
        targets: ".hamburgerCloseText",
        opacity: 0,
        duration: 500
    });

    anime({
        targets: ".hamburgerOpenText",
        translateY: [-10, 0],
        opacity: [0, 1],
        duration: 500
    });

    // Hide Menu
    anime({
        targets: ".menu",
        translateY: "-100%",
        duration: 200,
        easing: 'cubicBezier(.5, .05, .1, .3)'
    });
}







export const closeHamburgerMenu = () => {
    anime({
        targets: ".HamburgerMenuTopLine",
        y2: 20,
        duration: DURATION,
        stroke: "#66C3FF"
    });

    anime({
        targets: ".HamburgerMenuMiddelLine",
        opacity: 1,
        duration: DURATION,
        stroke: "#66C3FF"
    });

    anime({
        targets: ".HamburgerMenuBottomLine",
        y2: 80,
        duration: DURATION,
        stroke: "#66C3FF"
    });

    anime({
        targets: ".hamburgerCloseText",
        opacity: 0,
        duration: DURATION
    });

    anime({
        targets: ".hamburgerOpenText",
        translateY: [-10, 0],
        opacity: [0, 1],
        duration: 500
    });
}