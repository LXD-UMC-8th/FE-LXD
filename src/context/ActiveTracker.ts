let lastActive = Date.now();

const updateActivity = () => {
  lastActive = Date.now();
};

export const initActivityListeners = () => {
  window.addEventListener("mousemove", updateActivity);
  window.addEventListener("keydown", updateActivity);
  window.addEventListener("click", updateActivity);
};

export const cleanupActivityListeners = () => {
  window.removeEventListener("mousemove", updateActivity);
  window.removeEventListener("keydown", updateActivity);
  window.removeEventListener("click", updateActivity);
};

export const wasRecentlyActive = (minutes = 5): boolean => {
  return Date.now() - lastActive <= minutes * 60 * 1000;
};
