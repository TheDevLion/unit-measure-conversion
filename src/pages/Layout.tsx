import { Outlet, Link } from "react-router-dom";

export const Layout = () => {
  return (
    <div
      className="
        min-h-screen flex flex-col
        bg-[#0B0D10]
        text-[#F5F6FA]
      "
    >
      <nav
        className="
          bg-[#12141A]/80
          backdrop-blur
          py-4
          shadow-lg
          border-b border-[#1F2230]
          sticky top-0 z-50
        "
      >
        <ul className="flex justify-center">
          <li>
            <Link
              to="/"
              className="
                text-[#A78BFA]
                font-semibold
                text-lg
                hover:text-[#C4B5FD]
                transition-colors
              "
            >
              Unit Measure Converter
            </Link>
          </li>
        </ul>
      </nav>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};
