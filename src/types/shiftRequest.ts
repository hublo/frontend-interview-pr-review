export type ShiftRequestStatus = "draft" | "pending" | "approved" | "rejected";

export interface ShiftRequest {
  id: string;
  candidateName: string;
  position: string;
  facility: string;
  date: string;
  startTime: string;
  endTime: string;
  currentStatus: ShiftRequestStatus;
  previousStatus?: ShiftRequestStatus;
  createdAt: string;
  updatedAt: string;
}
