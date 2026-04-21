/**
 * Returns "upcoming" if the event date is today or in the future,
 * "past" if it is before today. Compares YYYY-MM-DD only.
 */
export function getEventStatus(eventDate: Date): "upcoming" | "past" {
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const eventStr = `${eventDate.getUTCFullYear()}-${String(eventDate.getUTCMonth() + 1).padStart(2, "0")}-${String(eventDate.getUTCDate()).padStart(2, "0")}`;
  return eventStr >= todayStr ? "upcoming" : "past";
}
