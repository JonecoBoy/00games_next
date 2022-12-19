import { z } from "zod";
import { allowedProviders } from "../../auth/allowedProviders";
import { baseUserSchema } from "./baseUserSchema";
import { providerSchema } from "./base/providerSchema";
import { uniqueEmailSchema } from "./base/uniqueEmailSchema";

const messages = {
  invalidProvider: "Google Auth is needed.",
};

const googleProviderSchema = providerSchema.refine(
  (provider) => provider === allowedProviders.google,
  {
    message: messages.invalidProvider,
  }
);

export const googleUserSchema = baseUserSchema.extend({
  email: uniqueEmailSchema,
  provider: googleProviderSchema,
});

export type GoogleUserSchema = z.infer<typeof googleUserSchema>;