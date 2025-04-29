import { RxInstagramLogo, RxLinkedinLogo, RxTwitterLogo } from "react-icons/rx";
const Footer = () => {
  return (
    <div> 
      <footer className="footerBottom h-full w-full pb-3 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 flex justify-between items-center shadow-lg shadow-black px-8 md:px-20 border-t border-blue-800/30">
        <p className="text-white text-center text-base md:text-lg font-medium tracking-wide">
          &copy; 2025 <span className="font-bold text-amber-400">HireHub</span>. All rights reserved.
        </p>
        <span className="flex gap-4 py-5 ">
          <RxInstagramLogo className="text-amber-400 hover:text-white text-2xl transition-colors duration-200" />
          <RxTwitterLogo className="text-amber-400 hover:text-white text-2xl transition-colors duration-200" />
          <RxLinkedinLogo className="text-amber-400 hover:text-white text-2xl transition-colors duration-200" />
        </span>
      </footer>
    </div>
  );
};
export default Footer;
