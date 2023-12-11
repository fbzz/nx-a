//In case of the ticket not having a assignment we set as unassigned, in this case we use 0 to represent
export const UNASSIGNED = 0;

export const ticketToHumanStatus = (completed: boolean) =>
  completed ? "Completed" : "On Progress";
