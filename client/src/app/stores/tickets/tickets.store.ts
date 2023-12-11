import { create } from "zustand";
import { Ticket, User } from "@acme/shared-models";
import { UNASSIGNED } from "../../utils";

export type Store = {
  tickets: Ticket[];
  users: User[];
  editingTicket: Ticket | null;
  loading: number;
  error: string | null;
};

export type Action = {
  addNewTicket: (newTicket: Ticket) => void;
  fetchTickets: () => Promise<void>;
  fetchUsers: () => Promise<void>;
  fetchTicketDetails: (id: number) => Promise<void>;
  updateTicket: (
    completed: boolean,
    assigneeId: number | null
  ) => Promise<void>;
  updateTicketStatus: (completed: boolean) => Promise<void>;
  updateAssigneeId: (assignedId: number | null) => Promise<void>;
  addLoading: () => void;
  removeLoading: () => void;
  createNewTicket: (description: string) => Promise<Ticket>;
  cleanEditingTicket: () => void;
};

//#TODO we can add some axios or other fetch library and improve all the fetch migrating to another file
//But for this demo I'm going to use fetch
//I'm trying to achieve a state machine, all the tickets actions and state should be on this file
//With that we write a little bit more of code but we have more control on the state of the application

export const useTicketStore = create<Store & Action>()((set, get) => ({
  tickets: [],
  users: [],
  editingTicket: null,
  loading: 0,
  error: null,
  createNewTicket: async (description: string) => {
    const result = await fetch("/api/tickets", {
      method: "POST",
      body: JSON.stringify({ description: description }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newTicket: Ticket = await result.json();
    await get().fetchTickets();
    return newTicket;
  },
  addNewTicket: (newTicket) =>
    set((state) => ({ tickets: [...state.tickets, newTicket] })),
  fetchTickets: async () => {
    try {
      get().addLoading();
      const ticketsResponse = await fetch("/api/tickets");
      set({
        tickets: await ticketsResponse.json(),
      });
    } catch (error) {
      set({
        error: "Something went wrong, fetching Tickets!",
      });
    } finally {
      get().removeLoading();
    }
  },
  fetchUsers: async () => {
    try {
      get().addLoading();
      const userResponse = await fetch("/api/users");
      const users = (await userResponse.json()) as User[];
      set({
        users: [...users, { name: "Unassigned", id: UNASSIGNED } as User],
      });
    } catch (error) {
      set({
        error: "Something went wrong, fetching Users!",
      });
    } finally {
      get().removeLoading();
    }
  },
  fetchTicketDetails: async (id: number) => {
    try {
      get().addLoading();
      const ticketResponse = await fetch(`/api/tickets/${id}`);
      set({
        editingTicket: await ticketResponse.json(),
      });
    } catch (error) {
      set({
        error: "Something went wrong, fetching ticket details",
      });
    } finally {
      get().removeLoading();
    }
  },
  updateTicket: async (completed: boolean, assigneeId: number | null) => {
    let refetch = false;
    if (completed !== get().editingTicket?.completed) {
      await get().updateTicketStatus(completed);
      refetch = true;
    }
    if (assigneeId !== get().editingTicket?.assigneeId) {
      await get().updateAssigneeId(assigneeId);
      refetch = true;
    }

    get().cleanEditingTicket();
    if (refetch) {
      await get().fetchTickets();
    }

    /*
    //Because of the delay of updating we search for the ticket and update it offline
    const index = get().tickets.findIndex(
      (ticket) => ticket.id === get().editingTicket!.id
    );
    let updatedTicketList = [...get().tickets];
    updatedTicketList.splice(index, 1, {
      id: get().editingTicket!.id,
      description: get().editingTicket!.description,
      completed: completed,
      assigneeId: Number(assigneeId) ? assigneeId : 0,
    });

    set(() => ({
      tickets: [...updatedTicketList],
    })); */
  },
  updateTicketStatus: async (completed: boolean) => {
    try {
      get().addLoading();
      const ticketCompleteResponse = await fetch(
        `/api/tickets/${get().editingTicket?.id}/complete`,
        { method: completed ? "PUT" : "DELETE" }
      );
      await ticketCompleteResponse.json();
    } catch (error) {
      set({
        error: "Something went wrong, updating ticket status",
      });
    } finally {
      get().removeLoading();
    }
  },
  updateAssigneeId: async (assigneeId: number | null) => {
    try {
      get().addLoading();
      const URL = Number(assigneeId)
        ? `/api/tickets/${get().editingTicket?.id}/assign/${Number(assigneeId)}`
        : `/api/tickets/${get().editingTicket?.id}/unassign`;
      const updateAssigneeResponse = await fetch(URL, { method: "PUT" });
      await updateAssigneeResponse.status;
    } catch (error) {
      set({
        error: "Something went wrong, updating ticket assignee",
      });
    } finally {
      get().removeLoading();
    }
  },
  addLoading: () => {
    set({ loading: get().loading + 1 });
  },
  removeLoading: () => {
    set({ loading: get().loading - 1 });
  },
  cleanEditingTicket: () => {
    set({ editingTicket: null });
  },
}));
