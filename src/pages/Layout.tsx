import { Outlet, Link } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      
      <nav className="bg-gray-100 py-4 shadow-md">
        <ul className="flex justify-center space-x-8">
          <li>
            <Link
              to="/"
              className="text-gray-700 font-medium hover:text-blue-600 active:text-blue-800 transition-colors"
            >
              Unit Measure Converter
            </Link>
          </li>
          {/* {(<li>
            <Link
              to="/technical-datasheet"
              className="text-gray-700 font-medium hover:text-blue-600 active:text-blue-800 transition-colors"
            >
              Technical Datasheet
            </Link>
          </li>)} */}
        </ul>
      </nav>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};
