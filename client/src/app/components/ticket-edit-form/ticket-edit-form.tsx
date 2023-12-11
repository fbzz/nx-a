import { User } from "@acme/shared-models";
import { UNASSIGNED } from "../../utils";
import Select, { SelectOption } from "../select/select";
import Toggle from "../toggle/toggle";
import { useTicketStore } from "../../stores/tickets/tickets.store";

/* eslint-disable-next-line */
export interface TicketEditFormProps {
  assigneeId: number | null;
  completed: boolean;
  handleChange(event: React.ChangeEvent<any>): void;
  handleToggleChange(event: React.ChangeEvent<any>): void;
}

export function TicketEditForm({
  assigneeId,
  completed,
  handleChange,
  handleToggleChange,
}: TicketEditFormProps) {
  const { users } = useTicketStore((state) => state);

  const usersToSelectOptions = (users: User[]) => {
    return users.map((user) => {
      return { text: user.name, value: user.id } as SelectOption;
    });
  };

  return (
    <>
      <Select
        value={assigneeId || UNASSIGNED}
        label="Assigned To"
        name="assigneeId"
        options={usersToSelectOptions(users)}
        onChange={handleChange}
      />
      <Toggle
        label="Completed"
        name="completed"
        checked={completed}
        onClick={handleToggleChange}
      />
    </>
  );
}

export default TicketEditForm;
