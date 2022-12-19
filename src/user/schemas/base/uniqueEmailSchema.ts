import * as userRepository from "../../../user/userRepository";
import { emailSchema } from "./emailSchema";

const messages = {
  emailExists: "this email is already registered",
};

export const uniqueEmailSchema = emailSchema.refine(
  async (email) => {
    const user = await userRepository.findByEmail(email);
    return user === null;
  },
  {
    message: messages.emailExists,
  }
);