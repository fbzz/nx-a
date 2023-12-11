import { render } from "@testing-library/react";

import Toastr from "./toastr";

describe("Toastr", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<Toastr />);
    expect(baseElement).toBeTruthy();
  });
});
