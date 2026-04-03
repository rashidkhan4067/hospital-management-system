/**
 * @file utils/validationUtils.js
 * @description Standard form validations
 */

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validatePassword = (password) => {
  return password && password.length >= 8;
};

export const validatePhone = (phone) => {
  return String(phone).match(/^\+?[1-9]\d{1,14}$/);
};

export const getFirstError = (errorData) => {
  if (!errorData) return "Operation failed";
  if (typeof errorData === "string") return errorData;
  
  const entries = Object.entries(errorData);
  if (entries.length === 0) return "Something went wrong";
  
  const [key, value] = entries[0];
  const message = Array.isArray(value) ? value[0] : value;
  return `${key}: ${message}`;
};
