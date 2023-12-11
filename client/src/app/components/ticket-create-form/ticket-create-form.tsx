import Input from "../input/input";

/* eslint-disable-next-line */
export interface TicketCreateFormProps {
  value: string;
  handleChange(event: React.ChangeEvent<any>): void;
}

export function TicketCreateForm({
  value,
  handleChange,
}: TicketCreateFormProps) {
  return (
    <>
      <Input
        label="Description"
        value={value}
        name="description"
        onChange={handleChange}
      />
    </>
  );
}

export default TicketCreateForm;
