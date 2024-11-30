export const commentKeys = {
  create: () => ["CREATE_COMMENT"] as const,
  getAll: () => ["COMMENTS"] as const,
  details: (commentId: number | undefined) =>
    ["DISCOUNT_DETAILS", commentId] as const,
  delete: (commentId: number) => ["DELETE_COMMENT", commentId] as const,
};
