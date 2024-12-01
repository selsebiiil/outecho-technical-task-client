export const topicsKeys = {
  create: () => ["CREATE_TOPIC"] as const,
  getAll: () => ["TOPICS"] as const,
  getTopic: (id: number) => ["TOPIC", id] as const,
  getMyTopics: () => ["MYTOPICS"] as const,
  delete: (topicId: number) => ["DELETE_TOPIC", topicId] as const,
};
