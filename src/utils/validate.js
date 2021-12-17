import { emailFormat } from "./tools";
export const validateEmail = (rule, value, callback) => {
  if (!value || !emailFormat(value)) {
    callback(new Error('Please enter the correct email format'));
  } else {
    callback();
  }
};