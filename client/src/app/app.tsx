import { Routes, Route } from "react-router-dom";

import Tickets from "./tickets/tickets";
import Header from "./components/header/header";

import "tailwindcss/tailwind.css";
import "../styles.css";
import TicketDetails from "./ticket-details/ticket-details";
import { useEffect } from "react";
import { useTicketStore } from "./stores/tickets/tickets.store";
import { useMainStore } from "./stores/main/main.store";
import Toastr from "./components/toastr/toastr";

const App = () => {
  const fetchUsers = useTicketStore((state) => state.fetchUsers);
  const theme = useMainStore((state) => state.theme);

  //because we need the users in everypage of our application I think we can request it on boot.
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Header />
      <div className="p10 h-screen overflow-auto" data-theme={theme}>
        <Routes>
          <Route path="/" element={<Tickets />} />
          {/* Hint: Try `npx nx g component TicketDetails --project=client --no-export` to generate this component  */}
          <Route path="/:id" element={<TicketDetails />} />
          <Route path="/:create" element={<TicketDetails />} />
        </Routes>
        <Toastr />
      </div>
    </>
  );
};

export default App;
