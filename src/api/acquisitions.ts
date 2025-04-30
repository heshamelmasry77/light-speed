import api from "./axios";

export type Acquisition = {
  timestamp: number;
  ore_sites: number;
};

export const fetchAcquisitions = async (): Promise<Acquisition[]> => {
  const response = await api.get<Acquisition[]>("/acquisitions");
  return response.data;
};
