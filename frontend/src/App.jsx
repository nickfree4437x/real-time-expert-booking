import { BrowserRouter, Link, NavLink } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            {/* Logo / Brand */}
            <Link
              to="/"
              className="text-xl font-extrabold text-indigo-600 tracking-tight"
            >
              Expert Booking
            </Link>

            {/* Nav */}
            <nav className="flex items-center gap-4 text-sm font-medium">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg transition ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                  }`
                }
              >
                Experts
              </NavLink>

              <NavLink
                to="/my-bookings"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg transition ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                  }`
                }
              >
                My Bookings
              </NavLink>
            </nav>
          </div>
        </header>

        {/* Pages */}
        <main className="max-w-7xl mx-auto">
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;