const Footer = () => {
  return (
    <div className="bg-orange-500 py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <span className="text-lg md:text-3xl text-white font-bold tracking-tight">
          KhaoPeeyo
        </span>
        <span className="text-white font-bold tracking-tight flex gap-4">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </span>
      </div>
        <span className="text-white flex justify-center items-center mt-5 font-semibold">
          Made in India with ❤️
        </span>
    </div>
  );
};

export default Footer;
