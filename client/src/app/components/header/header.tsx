import { useNavigate } from "react-router-dom";
import { useTicketStore } from "../../stores/tickets/tickets.store";
import { useMainStore } from "../../stores/main/main.store";

/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header() {
  const navigate = useNavigate();
  const cleanEditingTicket = useTicketStore(
    (state) => state.cleanEditingTicket
  );
  const theme = useMainStore((state) => state.theme);
  const changeTheme = useMainStore((state) => state.changeTheme);

  const navigateToCreation = () => {
    navigate("/create");
    cleanEditingTicket();
  };

  return (
    <div className="navbar bg-base-100" data-theme={theme}>
      <div className="navbar-start">
        <a
          className="btn btn-ghost text-sm md:text-lg"
          onClick={() => navigate("/")}
        >
          Cool ticket management
        </a>
      </div>
      <div className="navbar-center hidden lg:flex"></div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a onClick={() => navigateToCreation()}>Add Ticket </a>
          </li>
        </ul>
        <ul className="menu menu-horizontal px-1">
          <li>
            <a
              onClick={() =>
                changeTheme(theme === "dracula" ? "light" : "dracula")
              }
            >
              {theme === "dracula" ? "Light theme" : "Dark Theme"}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
