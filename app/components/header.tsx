const Header = () => {
  return (
    <header className="bg-[#F4A635] shadow-lg sticky top-0 z-50 w-full flex items-center justify-center">
      <div className="max-w-120 mx-auto px-5 py-4.5 pb-3.5">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="text-[28px]  p-1 ">
            <img
              src={"/logo.webp"}
              alt="Duck'n Donuts Logo"
              className="h-10 w-10 object-contain rounded-full"
            />
          </div>

          {/* Nome */}
          <div>
            <h1
              className="text-2xl font-bold text-[#3B2A14] leading-none"
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              Duck'n Donuts
            </h1>
          </div>

          {/* botões */}
        </div>
      </div>
    </header>
  );
};

export default Header;
