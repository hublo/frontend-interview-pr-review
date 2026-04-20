export type ShiftRequestStatus = "draft" | "pending" | "approved" | "rejected";

export interface ShiftRequest {
  id: string;
  candidateName: string;
  position: string;
  facility: string;
  date: string;
  startTime: string;
  endTime: string;
  status: ShiftRequestStatus;
  createdAt: string;
}
