import { useNavigate, useParams } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import { Ticket } from "@acme/shared-models";
import { useTicketStore } from "../stores/tickets/tickets.store";
import { Loader } from "../components/loader/loader";

const TicketEditForm = lazy(
  () => import("../components/ticket-edit-form/ticket-edit-form")
);

const TicketCreateForm = lazy(
  () => import("../components/ticket-create-form/ticket-create-form")
);

/* eslint-disable-next-line */
type InteractionType = "UPDATE" | "CREATE";

//Because the challenge says about using only 2 pages, I will use this page to show details and create tickets, in a real scenario I would split it.
export function TicketDetails() {
  const { id } = useParams();
  const { editingTicket, loading } = useTicketStore((state) => state);
  const navigate = useNavigate();
  const createNewTicket = useTicketStore((state) => state.createNewTicket);
  const updateTicket = useTicketStore((state) => state.updateTicket);
  const fetchTicketDetails = useTicketStore(
    (state) => state.fetchTicketDetails
  );
  const [inputValue, setInputValue] = useState<Omit<Ticket, "id">>({
    description: "",
    assigneeId: 0,
    completed: false,
  });

  //We can avoid re-render if use description as a useRef but I think that in this case it's fine to be a state
  const { description, assigneeId, completed } = inputValue;

  const [interactionType, setInteractionType] =
    useState<InteractionType>("CREATE");

  //This effect would check if we have an ID for retrieve it from the BE or if it is a create URL;
  useEffect(() => {
    const interactionType =
      !id || id.toUpperCase() === "CREATE" ? "CREATE" : "UPDATE";
    setInteractionType(interactionType);
    if (interactionType === "UPDATE") {
      fetchTicketDetails(Number(id));
    }
  }, [id]);

  //This effect will check if we have a editing ticket, if so we set the value to the form.
  useEffect(() => {
    setInputValue({
      description: editingTicket?.description || "",
      assigneeId: editingTicket?.assigneeId || 0,
      completed: editingTicket?.completed || false,
    });
  }, [editingTicket]);

  const handleChange = (event: React.ChangeEvent<any>) => {
    const { name, value } = event.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: name === "assigneeId" ? Number(value) : value,
    }));
  };

  const handleToggleChange = (event: React.ChangeEvent<any>) => {
    setInputValue((prev) => ({
      ...prev,
      completed: event.target.checked,
    }));
  };

  const submit = async () => {
    if (interactionType === "CREATE") {
      await createNewTicket(description);
    } else {
      await updateTicket(completed, Number(assigneeId) || null);
    }
    navigate("/?preventFetch=true");
  };

  return (
    <div
      className="flex flex-col justify-center items-center"
      data-testid="ticketDetails"
    >
      {loading ? (
        <Loader />
      ) : (
        <div className="w-96 animate__animated animate__fadeInUp">
          {interactionType === "CREATE" && (
            <Suspense fallback={<Loader />}>
              <TicketCreateForm
                value={description}
                handleChange={handleChange}
              />
            </Suspense>
          )}
          {interactionType === "UPDATE" && (
            <Suspense fallback={<Loader />}>
              <TicketEditForm
                assigneeId={assigneeId}
                completed={completed}
                handleChange={handleChange}
                handleToggleChange={handleToggleChange}
              />
            </Suspense>
          )}
          <button onClick={submit} className="btn btn-secondary w-full">
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default TicketDetails;
