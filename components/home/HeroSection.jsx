import Link from 'next/link';

const HeroSection = () => {
  return (
    <div className="relative h-[70vh] flex items-center justify-center text-center">
      <div className="bg-gradient-to-r from-blue-600/90 via-blue-500/70 to-blue-600/90 p-6 md:p-10 rounded-lg text-white shadow-lg mx-4">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 drop-shadow-lg">Welcome to the Art Market</h1>
        <p className="text-lg md:text-xl mb-6 md:mb-8 drop-shadow-md">Discover artworks and support artists worldwide.</p>
        <Link href="/Artworks">
          <button className="bg-blue-500 hover:bg-blue-600 px-6 md:px-8 py-3 md:py-4 text-white font-bold rounded-full transition-transform transform hover:scale-105 shadow-lg">
            Explore Artworks
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection; 