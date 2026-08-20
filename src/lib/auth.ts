import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },

  pages: {
    signIn: '/login',
  },

  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        username: {
          label: 'Username',
          type: 'text',
        },

        password: {
          label: 'Password',
          type: 'password',
        },
      },

      async authorize(credentials) {
        if (
          !credentials?.username ||
          !credentials?.password
        ) {
          return null;
        }

        const response = await fetch(
          `${process.env.JSON_SERVER_URL}/admins?username=${encodeURIComponent(
            credentials.username
          )}`,
          {
            cache: 'no-store',
          }
        );

        const admins = await response.json();

        const admin = admins?.[0];

        if (!admin) {
          return null;
        }

        const isValidPassword =
          await bcrypt.compare(
            credentials.password,
            admin.passwordHash
          );

        if (!isValidPassword) {
          return null;
        }

        return {
          id: String(admin.id),
          name: admin.username,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id =
          token.id;
      }

      return session;
    },
  },
};