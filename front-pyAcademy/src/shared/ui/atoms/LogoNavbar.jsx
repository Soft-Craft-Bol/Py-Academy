export const LogoNavbar = ({ logo, title }) => {
  return (
    <div className="flex items-center">
      <div className="flex items-center space-x-2">
        <img src={logo} alt="PyAcademy Logo" className="w-10 h-10" />
        <h1 className="font-bold text-lg text-gray-800 hidden sm:block dark:text-white">
          {title}
        </h1>
      </div>
    </div>
  );
};
