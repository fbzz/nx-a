import { render, screen } from "@testing-library/react";

import TicketDetails from "./ticket-details";
import { Routes, Route, BrowserRouter, Router } from "react-router-dom";
import { useStore } from "zustand";
import { useTicketStore } from "../stores/tickets/tickets.store";

describe("App", () => {
  const initialStoreState = useTicketStore.getState();

  beforeEach(() => {
    useTicketStore.setState({ tickets: [], loading: 0 });
  });

  it("renders headline", () => {
    render(
      <BrowserRouter>
        <TicketDetails />
      </BrowserRouter>
    );

    screen.debug();
    const loaderElement = screen.findByTestId("loading");

    // Your assertions go here
    expect(loaderElement).toBeDefined();

    // check if App components renders headline
  });
});
