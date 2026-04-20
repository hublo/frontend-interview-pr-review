import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { shiftRequestsApi } from "../api/shiftRequests";
import type { ShiftRequestStatus } from "../types/shiftRequest";
import { ShiftRequestRow } from "./ShiftRequestRow";

export const ShiftRequestList = () => {
  const [statusFilter, setStatusFilter] = useState<
    ShiftRequestStatus | undefined
  >();

  const {
    data: shiftRequests = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["shiftRequests", { status: statusFilter }],
    queryFn: () => shiftRequestsApi.getAll({ status: statusFilter }),
  });

  if (isLoading) return <div className="loading-spinner" />;
  if (error) return <div className="error-banner">Une erreur est survenue</div>;

  return (
    <div>
      <div className="filters">
        <select
          value={statusFilter ?? ""}
          onChange={(e) =>
            setStatusFilter((e.target.value as ShiftRequestStatus) || undefined)
          }
        >
          <option value="">Tous les statuts</option>
          <option value="draft">Brouillon</option>
          <option value="pending">En attente</option>
          <option value="approved">Approuvé</option>
          <option value="rejected">Rejeté</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Candidat</th>
            <th>Poste</th>
            <th>Établissement</th>
            <th>Date</th>
            <th>Horaire</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {shiftRequests.map((sr) => (
            <ShiftRequestRow key={sr.id} shiftRequest={sr} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
