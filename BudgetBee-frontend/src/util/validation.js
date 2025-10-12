export const validateEmail = (email) => {
  // Check if email is empty
  if (!email || !email.trim()) {
    return false;
  }

  // Validate email format with regex
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
