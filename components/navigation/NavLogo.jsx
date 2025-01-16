import Image from 'next/image';
import Link from 'next/link';
import logo from "../../public/assets/ArtMarket-Logo.png";
import darkLogo from "../../public/assets/ArtMarket-Logo-Dark.png";

export const NavLogo = ({ onMobileClick }) => (
  <Link 
    href="/" 
    className="inline mx-2 my-2" 
    onClick={(e) => {
      e.stopPropagation();
      onMobileClick();
    }}
  >
    <Image 
      className="dark:hidden"
      width={75}
      height={75}
      src={logo}
      alt="ArtMarket Logo"
      priority
    />
    <Image
      className="hidden dark:block"
      width={75}
      height={75}
      src={darkLogo}
      alt="ArtMarket Logo"
      priority
    />
  </Link>
); 