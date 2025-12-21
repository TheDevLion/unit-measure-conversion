import { Outlet, Link } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-violet-50 via-violet-50/40 to-white">
      
      <nav className="
        bg-violet-50/80
        backdrop-blur
        py-4
        shadow-sm
        border-b border-violet-100
        sticky top-0 z-50
      ">
        <ul className="flex justify-center">
          <li>
            <Link
              to="/"
              className="
                text-violet-700
                font-semibold
                text-lg
                hover:text-violet-900
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
