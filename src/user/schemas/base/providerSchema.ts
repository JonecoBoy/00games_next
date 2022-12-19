import { z } from "zod";
import { allowedProvidersList } from "../../../auth/allowedProviders";

const messages = {
  invalidProvider:
    "Ohoou you are not allowed to be here. GET OUT!",
};

export const providerSchema = z
  .string()
  .refine((provider) => allowedProvidersList.includes(provider), {
    message: messages.invalidProvider,
  });