import apiClient from "@/utils/api";

interface KudoUser {
  id: number,
  full_name: string
}

interface Kudo {
  id: number;
  giver: KudoUser;
  receiver: KudoUser;
  message: string;
  timestamp: string
}

interface Kudos{
  given: Kudo[];
  received: Kudo[];
}
export const fetchKudos = async (): Promise<Kudos> => {
  const response = await apiClient.get<Kudos>("/kudos/");
  return response.data;
};

export const postKudo = async (kudo: { receiver_id: number; message: string }): Promise<Kudo> => {
  const response = await apiClient.post<Kudo>("/kudos/", kudo);
  return response.data;
};
