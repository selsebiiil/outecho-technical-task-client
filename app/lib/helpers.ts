// helpers.ts
export const getInitials = (firstName: string, lastName: string): string => {
  let initials = "";

  if (firstName && firstName.length > 0) {
    initials += firstName[0].toUpperCase() + ".";
  }

  if (lastName && lastName.length > 0) {
    initials += lastName[0].toUpperCase() + ".";
  }

  initials = initials || "N/A.";
  return initials;
};
