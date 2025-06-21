import { Link } from "react-router-dom";

export default function Footer() {
  return (

    <footer className="bg-white border-t-2 border-purple-200 dark:bg-gray-900 dark:border-purple-800">
      <div className="max-w-screen-xl px-4 py-10 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3 md:text-left">
          {/* Logo / Brand */}
          <div>
            <h2 className="mb-4 text-2xl font-bold text-purple-700 dark:text-purple-400">
              Simanggis
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Sistem Monitoring Makanan Bergizi Gratis untuk Sekolah.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-2 text-lg font-semibold text-purple-700 dark:text-purple-400">Menu</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>
                <Link
                  to="/"
                  className="transition hover:text-purple-800 dark:hover:text-purple-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/schools"
                  className="transition hover:text-purple-800 dark:hover:text-purple-300"
                >
                  School
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/6285220682014"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-purple-800 dark:hover:text-purple-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social media */}
          <div>
            <h3 className="mb-2 text-lg font-semibold text-purple-700 dark:text-purple-400">
              Follow Us
            </h3>
            <div className="flex justify-center space-x-4 md:justify-start">
              <a
                href="https://instagram.com/simanggis_for.school"
                className="text-purple-600 transition hover:text-purple-800 dark:hover:text-purple-300"
              >
                <i className="text-xl fab fa-instagram" />
              </a>
              <a
                href="https://github.com/AdrianFakhriza/simanggis"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 transition hover:text-purple-800 dark:hover:text-purple-300"
              >
                <i className="text-xl fab fa-github" />
              </a>
            </div>
          </div>
        </div>


        <div className="pt-6 mt-10 text-sm text-center text-gray-500 border-t border-purple-200 dark:border-purple-800 dark:text-gray-400">
          © 2025{" "}
          <span className="font-semibold text-purple-600 dark:text-purple-400">
            Simanggis
          </span>
          . All rights reserved.
        </div>
      </div>
    </footer>
  )
};