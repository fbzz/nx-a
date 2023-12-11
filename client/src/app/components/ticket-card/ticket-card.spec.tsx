import { render } from "@testing-library/react";

import TicketCard from "./ticket-card";

describe("Card", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<TicketCard />);
    expect(baseElement).toBeTruthy();
  });
});
