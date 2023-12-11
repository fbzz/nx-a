import { render } from "@testing-library/react";

import TicketCreateForm from "./ticket-create-form";

describe("TicketCreateForm", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<TicketCreateForm />);
    expect(baseElement).toBeTruthy();
  });
});
