export const formatDate = (dateString) => {
  if (!dateString) return ""; // Handle cases where date might be null or undefined
  const date = new Date(dateString);
  return date
    .toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .replace(" ", ", ");
};
