import styles from "./MainNav.module.css";
import { useEffect, useState } from "react";
import { NavLink, NavLinkRenderProps } from "react-router-dom";
// import Logo from "../../assets/Logo";
import Logo from "../../assets/Logo.svg";
import Container from "../UI/Container";

export default function MainNav() {
    const [logoState, setLogoState] = useState('base')
    // const [color, setColor] = useState('#000')

    useEffect(() => {
        window.addEventListener('scroll', e => {
            if (window.scrollY > 0)
                setLogoState('scroll-down')
            else
                setLogoState('scroll-up')
        })
    }, [])

    return (
        <>
            <header className="fixed w-full font-medium h-16 bg-white z-50">
                <span className={`${styles['logo-container']} ${styles[logoState]} z-0`}>
                    {/* <Logo color={color} /> */}
                    <img src={Logo} alt="" />
                </span>
                <Container className=" py-4 relative z-10">
                    <nav className={`flex items-center justify-between w-full h-full ${styles['nav']}`}>
                        <span className="block md:hidden"></span>
                        <span className="flex flex-wrap-reverse flex-row-reverse md:flex-row justify-between w-56 md:w-full">
                            <NavLeftUl />
                            <NavRightUl />
                        </span>
                    </nav>
                </Container>
            </header>
            <div className="h-16"></div>
        </>
    );
}


function navLinkStateClass({ isActive }: NavLinkRenderProps) {
    return isActive ? styles['link-active'] : ''
}

function NavLeftUl() {
    return (
        <ul className="flex gap-4">
            <li>
                <NavLink to='/' className={navLinkStateClass}>Home</NavLink>
            </li>
            <li>
                <NavLink to='/shop' className={navLinkStateClass}>Shop</NavLink>
            </li>
        </ul>
    )
}

function NavRightUl() {
    return (
        <ul className="flex gap-4">
            <li>
                <NavLink to='/cart' className={navLinkStateClass}>Cart</NavLink>
            </li>
            <li>
                <NavLink to='/user' className={navLinkStateClass}>User</NavLink>
            </li>
            <li>
                <NavLink to='/' className={navLinkStateClass}>( Logout )</NavLink>
            </li>
        </ul>
    )
}