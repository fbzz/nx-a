import { act, render, screen } from "@testing-library/react";

import Tickets from "./tickets";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import { ticketToHumanStatus } from "../utils";
import TicketDetails from "../ticket-details/ticket-details";
import { useTicketStore } from "../stores/tickets/tickets.store";

const TICKET_1_MOCK = {
  id: 1,
  description: "Install a monitor arm",
  assigneeId: 4,
  completed: false,
};

const TICKET_2_MOCK = {
  id: 2,
  description: "New Mock",
  assigneeId: 5,
  completed: false,
};

const TICKET_3_MOCK = {
  id: 3,
  description: "Completed",
  assigneeId: 5,
  completed: true,
};

const USER_MOCKS = [
  {
    id: 1,
    name: "Alice",
  },
  {
    id: 2,
    name: "Bob",
  },
  {
    id: 3,
    name: "Chris",
  },
  {
    id: 4,
    name: "Daisy",
  },
  {
    id: 5,
    name: "Ed",
  },
];

describe("App", () => {
  const initialStoreState = useTicketStore.getState();

  beforeEach(() => {
    useTicketStore.setState({
      tickets: [TICKET_1_MOCK],
      users: [...USER_MOCKS],
      loading: -1,
    });
  });

  it("renders the first card and ensure that all the data is the same", () => {
    render(
      <BrowserRouter>
        <Tickets />
      </BrowserRouter>
    );

    const cardDescription = screen.getByTestId("card-1-description");
    const cardStatus = screen.getByTestId("card-1-status");
    const cardUserAssigned = screen.getByTestId("card-1-username");
    const cardAction = screen.getByTestId("card-1-button");

    expect(cardDescription.textContent).toBe(TICKET_1_MOCK.description);
    expect(cardStatus.textContent).toBe(
      "Status: " + ticketToHumanStatus(TICKET_1_MOCK.completed)
    );
    expect(cardUserAssigned.textContent).toBe(
      "Agent: " +
        USER_MOCKS.filter((user) => user.id === TICKET_1_MOCK.assigneeId)[0]
          .name
    );
    expect(cardAction.textContent).toBe("Details");
  });

  it("renders one card and then update the main store to render a second card", () => {
    render(
      <BrowserRouter>
        <Tickets />
      </BrowserRouter>
    );

    const cardDescription = screen.getByTestId("card-1-description");
    const cardStatus = screen.getByTestId("card-1-status");
    const cardUserAssigned = screen.getByTestId("card-1-username");
    const cardAction = screen.getByTestId("card-1-button");

    expect(cardDescription.textContent).toBe(TICKET_1_MOCK.description);
    expect(cardStatus.textContent).toBe(
      "Status: " + ticketToHumanStatus(TICKET_1_MOCK.completed)
    );
    expect(cardUserAssigned.textContent).toBe(
      "Agent: " +
        USER_MOCKS.filter((user) => user.id === TICKET_1_MOCK.assigneeId)[0]
          .name
    );
    expect(cardAction.textContent).toBe("Details");

    act(() => {
      useTicketStore.setState((prev) => ({
        tickets: [...prev.tickets, TICKET_2_MOCK],
      }));
    });

    const card2Description = screen.getByTestId("card-2-description");
    const card2Status = screen.getByTestId("card-2-status");
    const card2UserAssigned = screen.getByTestId("card-2-username");
    const card2Action = screen.getByTestId("card-2-button");

    expect(card2Description.textContent).toBe(TICKET_2_MOCK.description);
    expect(card2Status.textContent).toBe(
      "Status: " + ticketToHumanStatus(TICKET_2_MOCK.completed)
    );
    expect(card2UserAssigned.textContent).toBe(
      "Agent: " +
        USER_MOCKS.filter((user) => user.id === TICKET_2_MOCK.assigneeId)[0]
          .name
    );
    expect(card2Action.textContent).toBe("Details");
  });

  it("renders one card and then update the main store to render a second card but with completed status, should not be present on the screen", () => {
    render(
      <BrowserRouter>
        <Tickets />
      </BrowserRouter>
    );

    const cardDescription = screen.getByTestId("card-1-description");
    const cardStatus = screen.getByTestId("card-1-status");
    const cardUserAssigned = screen.getByTestId("card-1-username");
    const cardAction = screen.getByTestId("card-1-button");

    expect(cardDescription.textContent).toBe(TICKET_1_MOCK.description);
    expect(cardStatus.textContent).toBe(
      "Status: " + ticketToHumanStatus(TICKET_1_MOCK.completed)
    );
    expect(cardUserAssigned.textContent).toBe(
      "Agent: " +
        USER_MOCKS.filter((user) => user.id === TICKET_1_MOCK.assigneeId)[0]
          .name
    );
    expect(cardAction.textContent).toBe("Details");

    act(() => {
      useTicketStore.setState((prev) => ({
        tickets: [...prev.tickets, TICKET_3_MOCK],
      }));
    });

    const card3Description = screen.queryByText("Completed");

    expect(card3Description).toBeNull();
  });

  it("renders one card and then update filter by status, should display ticket3 and hide ticket 1", () => {
    render(
      <BrowserRouter>
        <Tickets />
      </BrowserRouter>
    );

    const cardDescription = screen.getByTestId("card-1-description");
    const cardStatus = screen.getByTestId("card-1-status");
    const cardUserAssigned = screen.getByTestId("card-1-username");
    const cardAction = screen.getByTestId("card-1-button");

    expect(cardDescription.textContent).toBe(TICKET_1_MOCK.description);
    expect(cardStatus.textContent).toBe(
      "Status: " + ticketToHumanStatus(TICKET_1_MOCK.completed)
    );
    expect(cardUserAssigned.textContent).toBe(
      "Agent: " +
        USER_MOCKS.filter((user) => user.id === TICKET_1_MOCK.assigneeId)[0]
          .name
    );
    expect(cardAction.textContent).toBe("Details");

    act(() => {
      useTicketStore.setState((prev) => ({
        tickets: [...prev.tickets, TICKET_3_MOCK],
      }));
    });

    const filterButton = screen.getByTestId("filterByStatus");

    act(() => {
      filterButton.click();
    });

    const card3Description = screen.getByTestId("card-3-description");
    expect(card3Description.textContent).toBe(TICKET_3_MOCK.description);

    const card1Description = screen.queryByText(TICKET_1_MOCK.description);
    expect(card1Description).toBeNull();
  });

  it("renders the first card AND call the navigation", () => {
    let component = render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Tickets />} />
          <Route path="/:id" element={<TicketDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const cardDescription = screen.getByTestId("card-1-description");
    const cardStatus = screen.getByTestId("card-1-status");
    const cardUserAssigned = screen.getByTestId("card-1-username");
    const cardAction = screen.getByTestId("card-1-button");

    expect(cardDescription.textContent).toBe(TICKET_1_MOCK.description);
    expect(cardStatus.textContent).toBe(
      "Status: " + ticketToHumanStatus(TICKET_1_MOCK.completed)
    );
    expect(cardUserAssigned.textContent).toBe(
      "Agent: " +
        USER_MOCKS.filter((user) => user.id === TICKET_1_MOCK.assigneeId)[0]
          .name
    );
    expect(cardAction.textContent).toBe("Details");

    act(() => {
      cardAction.click();
    });

    const ticketDetails = screen.getByTestId("ticketDetails");
    expect(ticketDetails).toBeDefined();
  });
});
