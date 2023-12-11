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
  createNewTicket: (description: string) => Promise<void>;
  cleanEditingTicket: () => void;
  cleanError: () => void;
};

//#TODO we can add some axios or other fetch library and improve all the fetch migrating to another file, or just make the code less repetitive
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
    try {
      get().addLoading();
      get().cleanError();
      const result = await fetch("/api/tickets", {
        method: "POST",
        body: JSON.stringify({ description: description }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!result.ok) {
        throw new Error(result.status.toString());
      }
      const newTicket: Ticket = await result.json();
      await get().fetchTickets();
    } catch (e) {
      set({
        error: "Something went wrong, creating ticket! " + e,
      });
    } finally {
      get().removeLoading();
    }
  },
  fetchTickets: async () => {
    get().cleanError();
    try {
      get().addLoading();
      const ticketsResponse = await fetch("/api/tickets");
      if (!ticketsResponse.ok) {
        throw new Error(ticketsResponse.status.toString());
      }
      set({
        tickets: await ticketsResponse.json(),
      });
    } catch (error) {
      console.log(error);
      set({
        error: "Something went wrong, fetching Tickets! " + error,
      });
    } finally {
      get().removeLoading();
    }
  },
  fetchUsers: async () => {
    try {
      get().addLoading();
      const userResponse = await fetch("/api/users");
      if (!userResponse.ok) {
        throw new Error(userResponse.status.toString());
      }
      const users = (await userResponse.json()) as User[];
      set({
        users: [...users, { name: "Unassigned", id: UNASSIGNED } as User],
      });
    } catch (error) {
      set({
        error: "Something went wrong, fetching Users! " + error,
      });
    } finally {
      get().removeLoading();
    }
  },
  fetchTicketDetails: async (id: number) => {
    try {
      get().addLoading();
      const ticketResponse = await fetch(`/api/tickets/${id}`);
      if (!ticketResponse.ok) {
        throw new Error(ticketResponse.status.toString());
      }
      set({
        editingTicket: await ticketResponse.json(),
      });
    } catch (error) {
      set({
        error: "Something went wrong, fetching ticket details! " + error,
      });
    } finally {
      get().removeLoading();
    }
  },
  updateTicket: async (completed: boolean, assigneeId: number | null) => {
    get().cleanError();
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
  },
  updateTicketStatus: async (completed: boolean) => {
    try {
      get().addLoading();
      const ticketCompleteResponse = await fetch(
        `/api/tickets/${get().editingTicket?.id}/complete`,
        { method: completed ? "PUT" : "DELETE" }
      );
      if (!ticketCompleteResponse.ok) {
        throw new Error(ticketCompleteResponse.status.toString());
      }
      await ticketCompleteResponse.status;
    } catch (error) {
      set({
        error: "Something went wrong, updating ticket status " + error,
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
        error: "Something went wrong, updating ticket assignee " + error,
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
  cleanError: () => {
    set({ error: "" });
  },
}));
