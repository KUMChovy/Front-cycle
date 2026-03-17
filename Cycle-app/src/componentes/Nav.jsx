import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faLocationDot, faBook, faUser } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const navItems = [
    { icon: faHouse, label: "Inicio", link: "/ciclo" },
    { icon: faLocationDot, label: "Ubicación", link: "/clinicas" },
    { icon: faBook, label: "Biblioteca", link: "/biblioteca" },
    { icon: faUser, label: "Perfil", link: "/perfil" },
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-pink-300 rounded-full shadow-lg z-50
                    md:top-0 md:bottom-auto md:w-full md:max-w-none md:rounded-none md:shadow-md">
      
      <ul className="flex justify-around items-center py-3 md:py-4">
        {navItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.link}
              className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-gray-700 hover:text-pink-600 transition"
            >
              <FontAwesomeIcon icon={item.icon} className="text-xl" />
              <span className="text-xs md:text-sm">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>

    </nav>
  );
};

export default Navbar;