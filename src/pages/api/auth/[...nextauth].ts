import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export default NextAuth({
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
          !credentials.password
        ) {
          return null;
        }

        const adminResponse = await fetch(
          `${process.env.JSON_SERVER_URL}/admins?username=${encodeURIComponent(
            credentials.username
          )}`
        );

        const admins =
          await adminResponse.json();

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
});