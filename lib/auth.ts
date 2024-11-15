import { connectToDB } from '@/db';
import { Admin } from '@/db/models/admin.model';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Email', type: 'text', placeholder: 'Email' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      async authorize(
        credentials: { username: string; password: string } | undefined,
      ) {
        if (!credentials) return null;
        try {
          await await connectToDB();
          const admin = await Admin.findOne({
            email: credentials?.username,
          }).select('password name id');
          if (
            admin &&
            admin.password &&
            admin.password == credentials?.password
          ) {
            return {
              id: admin.id.toString(),
              name: admin.name,
              email: credentials.username,
            };
          }
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signin',
  },
};
