import { useState } from "react";
import { useShiftRequests } from "../hooks/useShiftRequests";
import type { ShiftRequestStatus } from "../types/shiftRequest";
import { StatusBadge } from "./StatusBadge";

const ALL_STATUSES: ShiftRequestStatus[] = [
  "draft",
  "pending",
  "approved",
  "rejected",
];

export const BulkStatusUpdate = () => {
  const { shiftRequests, loading, refetch } = useShiftRequests();
  const [selected, setSelected] = useState<string[]>([]);
  const [targetStatus, setTargetStatus] = useState<string>("pending");
  const [updating, setUpdating] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = shiftRequests.filter(
    (sr) => !statusFilter || sr.status === statusFilter,
  );

  const handleToggle = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleSelectAll = () => {
    if (selected.length === shiftRequests.length) {
      setSelected([]);
    } else {
      setSelected(shiftRequests.map((sr) => sr.id));
    }
  };

  const handleBulkUpdate = async () => {
    setUpdating(true);

    // const results = await Promise.all(
    //   selected.map((id) =>
    //     fetch(`/api/shift-requests/${id}/status`, {
    //       method: "PATCH",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({ status: targetStatus }),
    //     })
    //   )
    // );

    for (const id of selected) {
      await fetch(`/api/shift-requests/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: targetStatus }),
      });
    }

    refetch();
    setSelected([]);
    setUpdating(false);
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <div className="bulk-actions">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Tous les statuts</option>
          {ALL_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={targetStatus}
          onChange={(e) => setTargetStatus(e.target.value)}
        >
          {ALL_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <button onClick={handleBulkUpdate} disabled={updating}>
          {updating ? "Mise à jour..." : `Mettre à jour (${selected.length})`}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selected.length === shiftRequests.length}
                onChange={handleSelectAll}
              />
            </th>
            <th>Candidat</th>
            <th>Poste</th>
            <th>Établissement</th>
            <th>Date</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((sr) => (
            <tr key={sr.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(sr.id)}
                  onChange={() => handleToggle(sr.id)}
                />
              </td>
              <td>{sr.candidateName}</td>
              <td>{sr.position}</td>
              <td>{sr.facility}</td>
              <td>{sr.date}</td>
              <td>
                <StatusBadge status={sr.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
