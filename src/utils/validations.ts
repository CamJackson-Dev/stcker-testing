import { Resolver } from "react-hook-form";
import validator from "validator";

const validateEmail = (value: string) => {
  if (!validator.isEmail(value)) return "Email is not valid";

  return undefined;
};

const validateRequiredField = (field: string) => (value: string) => {
  if (validator.isEmpty(value)) return `${field} is required`;

  return undefined;
};

const validateName = (field: string) => (value: string) => {
  if (validator.isEmpty(value)) return `${field} is required`;

  if (!validator.matches(value, /^[a-z ,.'-]+$/i))
    return `${field} should contain letters or ,.'-`;

  if (!validator.isLength(value, { max: 50 }))
    return `${field} should be less than 50 characters`;

  return undefined;
};

const validatePassword = (value: string) => {
  if (!validator.isLength(value, { min: 12 }))
    return "Password should be up to 12 characters";

  return undefined;
};

const validateConfirmPassword = (value: string, match: string) => {
  if (value !== match) return "Password do not match";

  return undefined;
};

const validate = {
  email: validateEmail,
  firstname: validateName("Firstname"),
  lastname: validateName("Lastname"),
  password: validatePassword,
  newPassword: validatePassword,
  subject: validateRequiredField("Subject"),
  message: validateRequiredField("Message"),
};

export interface FormValues {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
  subject: string;
  message: string;
}

export const resolver: Resolver<FormValues> = async (values: FormValues) => {
  const errors: Record<string, any> = {};

  Object.keys(values).forEach((field) => {
    const key = field as keyof FormValues;
    const message =
      key === "confirmPassword"
        ? validateConfirmPassword(values.confirmPassword, values.password)
        : validate[key](values[key]);
    if (message) {
      errors[key] = {
        type: "",
        message,
      };
    }
  });

  return {
    errors,
    values: values.email
      ? { ...values, email: values.email.toLowerCase() }
      : values,
  };
};

export const isObject = (value: any) =>
  value && typeof value === "object" && !Array.isArray(value);

export const parseValueIfJSONString = (value: any) => {
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};
