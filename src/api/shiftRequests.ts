import type { ShiftRequest, ShiftRequestStatus } from "../types/shiftRequest";

const API_BASE = "/api/shift-requests";

export const shiftRequestsApi = {
  getAll: async (filters?: {
    status?: ShiftRequestStatus;
    facility?: string;
  }): Promise<ShiftRequest[]> => {
    const params = new URLSearchParams();
    if (filters?.status) params.set("status", filters.status);
    if (filters?.facility) params.set("facility", filters.facility);

    const response = await fetch(`${API_BASE}?${params}`);
    if (!response.ok) throw new Error("Failed to fetch shift requests");
    return response.json();
  },

  updateStatus: async (
    id: string,
    status: ShiftRequestStatus,
  ): Promise<ShiftRequest> => {
    const response = await fetch(`${API_BASE}/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error("Failed to update shift request status");
    return response.json();
  },
};
