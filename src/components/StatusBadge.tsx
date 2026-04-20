import type { ShiftRequestStatus } from "../types/shiftRequest";

const statusConfig: Record<
  ShiftRequestStatus,
  { label: string; className: string }
> = {
  draft: { label: "Brouillon", className: "badge-draft" },
  pending: { label: "En attente", className: "badge-pending" },
  approved: { label: "Approuvé", className: "badge-approved" },
  rejected: { label: "Rejeté", className: "badge-rejected" },
};

interface StatusBadgeProps {
  status: ShiftRequestStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = statusConfig[status];
  return <span className={`badge ${config.className}`}>{config.label}</span>;
};
