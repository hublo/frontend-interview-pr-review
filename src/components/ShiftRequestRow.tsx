import type { ShiftRequest } from "../types/shiftRequest";
import { StatusBadge } from "./StatusBadge";

interface ShiftRequestRowProps {
  shiftRequest: ShiftRequest;
}

export const ShiftRequestRow = ({ shiftRequest }: ShiftRequestRowProps) => {
  return (
    <tr>
      <td>{shiftRequest.candidateName}</td>
      <td>{shiftRequest.position}</td>
      <td>{shiftRequest.facility}</td>
      <td>{shiftRequest.date}</td>
      <td>
        {shiftRequest.startTime} - {shiftRequest.endTime}
      </td>
      <td>
        <StatusBadge status={shiftRequest.status} />
      </td>
    </tr>
  );
};
