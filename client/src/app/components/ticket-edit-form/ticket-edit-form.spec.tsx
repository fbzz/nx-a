import { render } from "@testing-library/react";

import TicketEditForm from "./ticket-edit-form";

describe("TicketEditForm", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<TicketEditForm />);
    expect(baseElement).toBeTruthy();
  });
});
