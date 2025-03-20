import { RxInstagramLogo, RxLinkedinLogo, RxTwitterLogo } from "react-icons/rx";
const Footer = () => {
  return (
    <div> 
      <footer className="footerBottom h-full w-full pb-3 bg-gray-50 flex 
      justify-between items-center shadow-lg
       shadow-black px-20">
        <p className="text-black text-center">
          &copy; 2025 HireHub. All rights reserved.
        </p>
        <span className="flex gap-4  py-5 ">
          <RxInstagramLogo className="text-black text-2xl" />
          <RxTwitterLogo className="text-black text-2xl" />
          <RxLinkedinLogo className="text-black text-2xl" />
        </span>
      </footer>
    </div>
  );
};
export default Footer;
