import TicketCard from "../components/ticket-card/ticket-card";
import { useEffect, useState } from "react";
import { useTicketStore } from "../stores/tickets/tickets.store";
import { User } from "@acme/shared-models";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ticketToHumanStatus } from "../utils";

export function Tickets() {
  const { tickets, users, loading } = useTicketStore((state) => state);
  const [status, setStatus] = useState(false);
  const [queryParameters, setQueryParameters] = useSearchParams();
  const fetchTickets = useTicketStore((state) => state.fetchTickets);
  const navigate = useNavigate();

  const filterByUserId = (assigneeId: number | null): User | null => {
    if (!assigneeId) return null;
    return users.filter((user) => user.id === assigneeId)[0];
  };

  const filterByStatus = (status: boolean) => {
    const ticketsFiltered = tickets.filter(
      (ticket) => ticket.completed === status
    );

    if (ticketsFiltered.length === 0) {
      return (
        <span data-testid="fallbackMessage" className="p-3">
          No tickets available with the current filter ;(
        </span>
      );
    }

    return ticketsFiltered.map((t) => (
      <TicketCard
        {...t}
        key={t.id}
        user={filterByUserId(t.assigneeId)}
        onCardSelect={(id) => onCardSelect(id)}
      />
    ));
  };

  const onCardSelect = (id: number) => {
    navigate(`/${id}`);
  };

  //Because of the delay from the BE we prevent the refetch and update locally
  //But we just prevent one time and remove the parameter from the URL
  useEffect(() => {
    const preventFetch = queryParameters.get("preventFetch");
    if (preventFetch) {
      queryParameters.delete("preventFetch");
      setQueryParameters(queryParameters);
      return;
    }
    fetchTickets();
  }, []);

  return (
    <div className="flex flex-col p-5">
      <div className="flex flex-row items-center justify-center m-3 animate__animated animate__fadeInDown">
        {!loading ? (
          <button
            className="btn btn-secondary w-32"
            data-testid="filterByStatus"
            onClick={() => setStatus(!status)}
          >
            Filter by {ticketToHumanStatus(!status)}
          </button>
        ) : (
          <span className="loading loading-dots loading-lg"></span>
        )}
      </div>

      <div
        className="flex flex-row justify-center  flex-wrap"
        data-testid="container"
      >
        {!loading && (
          <>
            {tickets.length ? (
              <>{filterByStatus(status)}</>
            ) : (
              <span data-testid="fallbackMessage" className="p-5">
                No ticket available ;(
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Tickets;
