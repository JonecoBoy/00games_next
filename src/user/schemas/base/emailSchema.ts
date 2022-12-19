import { z } from "zod";

const messages = {
  emailInvalid: "this email is invalid.",
};

export const emailSchema = z.string().email({
  message: messages.emailInvalid,
});