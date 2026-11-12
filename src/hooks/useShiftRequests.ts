import { useEffect, useState } from "react";
import type { ShiftRequest } from "../types/shiftRequest";

export const useShiftRequests = (facilityFilter?: string) => {
  const [shiftRequests, setShiftRequests] = useState<ShiftRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchShiftRequests = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (facilityFilter) params.set("facility", facilityFilter);

    fetch(`/api/shift-requests?${params}`)
      .then((res) => res.json())
      .then((data) => {
        setShiftRequests(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchShiftRequests();
  }, [facilityFilter]);

  return { shiftRequests, loading, refetch: fetchShiftRequests };
};
