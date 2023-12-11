import { Ticket, User } from "@acme/shared-models";
import { ticketToHumanStatus } from "../../utils";
import { memo } from "react";

/* eslint-disable-next-line */
export interface TicketCardProps extends Ticket {
  user: User | null;
  onCardSelect(id: number): void;
}

/**
 * I basically wanted to let this component stateless, but it can be stateful with the user data inside of it
 * @param param0
 * @returns
 */
export function TicketCard({
  id,
  description,
  user,
  completed,
  onCardSelect,
}: TicketCardProps) {
  return (
    <div
      className="card w-96 max-w-96 h-64 max-h-64 bg-base-300 m-3 animate__animated animate__fadeInUp"
      data-testid={`card-${id}`}
    >
      <div className="card-body">
        <span
          className="card-title text-ellipsis overflow-hidden"
          data-testid={`card-${id}-description`}
        >
          {description}
        </span>
        <p data-testid={`card-${id}-status`}>
          Status: {ticketToHumanStatus(completed)}
        </p>
        <p data-testid={`card-${id}-username`}>
          Agent: {user?.name || "Unassigned"}
        </p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-secondary"
            data-testid={`card-${id}-button`}
            onClick={() => onCardSelect(id)}
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

const MemoizardTicketCard = memo(TicketCard);

export default MemoizardTicketCard;
