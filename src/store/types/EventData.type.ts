export type EventEntry = {
  user_id: string;
  team_id: string;
  event: string;
  createdAt: string;
  synced?: boolean;
};

export type EventLog = {
  user_id: string;
  team_id: string;
  event: string;
  createdAt: string;
};
