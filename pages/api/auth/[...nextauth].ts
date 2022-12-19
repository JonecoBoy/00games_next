import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { allowedProviders } from "../../../src/auth/allowedProviders";
import * as userService from "../../../src/user/userService";

// provider veio do documentacao do NextAuth -> next-auth.js.org/providers/credentials
// a tela de login padrao é /api/auth/signin

export const authOptions: AuthOptions = {
  callbacks: {
    redirect({ url, baseUrl }) {
      //return "/user/profile";
      // console.log(url,baseUrl)
      return url;
    },
    async session({ session }) {
      const userSession = await userService.getUserSessionData(
        session.user.email
      );
      session.user = userSession;
      return session;
    },
    async signIn({ account, profile }) {
      if (
        account?.provider === allowedProviders.google &&
        profile?.email &&
        (profile as any)?.given_name &&
        (profile as any)?.family_name
      ) {
        const {
          email,
          given_name: name,
          family_name: surname,
        } = profile as any;
        const { success } = await userService.googleLogin(email, {
          name,
          surname,
          email,
          provider: allowedProviders.google,
        });
        return success;
      }
      return true;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // aqui se o usuario for aprovado/autenticado beleza

        // se a senha ou usuario vier como undefined já poe pra fora
        if (
          credentials?.username === undefined ||
          credentials.password === undefined
        ) {
          return null;
        }

        const { username: email, password } = credentials;
        const { success, id } = await userService.credentialsLogin(
          email,
          password
        );
        if (success) {
          // retorna as infos
          return {
            id,
            email,
          };
        }
        // se nao for autenticado retorna nulo
        return null;
      },
    }),
  ],
};

export default NextAuth(authOptions);