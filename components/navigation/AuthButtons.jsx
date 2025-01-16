import Link from 'next/link';

export const AuthButtons = ({ isLoggedIn, user, onLogout, isMobile = false, onMenuClick }) => {
  const buttonBaseClass = `${isMobile ? 'w-full' : ''} rounded-full font-semibold text-white shadow-2xl p-3`;
  
  if (!isLoggedIn) {
    return (
      <>
        <Link 
          href="/Login" 
          className={isMobile ? 'w-full' : 'hover:underline mx-2'}
          onClick={isMobile ? onMenuClick : undefined}
        >
          <button className={`${buttonBaseClass} hover:bg-blue-700 bg-blue-600`}>
            Log in
          </button>
        </Link>
        <Link 
          href="/SignUp" 
          className={isMobile ? 'w-full' : 'hover:underline mx-2'}
          onClick={isMobile ? onMenuClick : undefined}
        >
          <button className={`${buttonBaseClass} hover:bg-blue-950 bg-blue-800`}>
            Sign up
          </button>
        </Link>
      </>
    );
  }

  return (
    <>
      <Link 
        href="/" 
        onClick={(e) => {
          onLogout();
          if (isMobile && onMenuClick) onMenuClick();
        }} 
        className={isMobile ? 'w-full' : 'hover:underline mx-2'}
      >
        <button className={`${buttonBaseClass} hover:bg-red-700 bg-red-500`}>
          Logout
        </button>
      </Link>
      {user?.userType === "ARTIST" && (
        <Link 
          href="/ArtistProfile" 
          className={isMobile ? 'w-full' : 'hover:underline mx-2'}
          onClick={isMobile ? onMenuClick : undefined}
        >
          <button className={`${buttonBaseClass} hover:bg-blue-700 bg-blue-600`}>
            Artist Profile
          </button>
        </Link>
      )}
      {user?.userType === "ADMIN" && (
        <Link 
          href="/AdminProfile" 
          className={isMobile ? 'w-full' : 'hover:underline mx-2'}
          onClick={isMobile ? onMenuClick : undefined}
        >
          <button className={`${buttonBaseClass} hover:bg-blue-700 bg-blue-500`}>
            Admin Profile
          </button>
        </Link>
      )}
    </>
  );
}; 