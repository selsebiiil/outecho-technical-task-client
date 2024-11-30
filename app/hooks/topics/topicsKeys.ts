export const topicsKeys = {
  create: () => ["CREATE_TOPIC"] as const,
  getAll: () => ["TOPICS"] as const,
  getTopic: (id: number) => ["TOPIC", id] as const,
  getMyTopics: (pageSize: number, page: number) =>
    ["MY_TOPICS", pageSize, page] as const,
  delete: (topicId: number) => ["DELETE_TOPIC", topicId] as const,
};
