import { z } from "zod";
import { userMessages } from "../../../user/userMessages";

const passwordMinLength = 8;
const passwordMaxLength = 64;
export const passwordSchema = z
  .string()
  .min(passwordMinLength, {
    message: userMessages.min("password", passwordMinLength),
  })
  .max(passwordMaxLength, {
    message: userMessages.max("password", passwordMaxLength),
  });