import Image from "next/image"
import Link from "next/link"
import logo from "../../public/assets/ArtMarket-Logo.png"
import darkLogo from "../../public/assets/ArtMarket-Logo-Dark.png"

export const NavLogo = ({ onMobileClick }) => (
    // Pressing on the logo takes the user to the home page
    <Link
        href="/"
        className="inline mx-2 my-2"
        onClick={(e) => {
            e.stopPropagation()
            onMobileClick()
        }}
    >   
        {/* Light logo (hidden in dark mode) */}
        <Image className="dark:hidden" width={75} height={75} src={logo} alt="ArtMarket Logo" priority />
        {/* Dark logo (shown in dark mode) */}
        <Image className="hidden dark:block" width={75} height={75} src={darkLogo} alt="ArtMarket Logo" priority />
    </Link>
)
