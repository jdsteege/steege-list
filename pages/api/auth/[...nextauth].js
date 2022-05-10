import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

//
const userDatabase = [
  { username: `aisha.steege`, firstname: `Aisha`, password: `wife` },
  { username: `john.steege`, firstname: `John`, password: `husband` },
];

//
export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Steege Sign-In",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        let user = null;
        try {
          for (const u of userDatabase) {
            if (
              u.username === credentials.username &&
              u.password === credentials.password
            ) {
              user = { username: u.username, firstname: u.firstname };
            }
          }
        } catch (err) {
          console.log(err);
        }

        // If we have user data, return it
        if (user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   console.log("signIn callback");
    //   console.log("user: " + JSON.stringify(user));
    //   console.log("account: " + JSON.stringify(account));
    //   console.log("profile: " + JSON.stringify(profile));
    //   console.log("email: " + JSON.stringify(email));
    //   return true;
    // },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl;
    // },
    async session({ session, user, token }) {
      //   console.log("session callback");
      //   console.log("session: " + JSON.stringify(session));
      //   console.log("user: " + JSON.stringify(user));
      //   console.log("token: " + JSON.stringify(token));

      session.user = token?.userCustom;

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      //   console.log("jwt callback");
      //   console.log("token: " + JSON.stringify(token));
      //   console.log("user: " + JSON.stringify(user));
      //   console.log("account: " + JSON.stringify(account));
      //   console.log("profile: " + JSON.stringify(profile));
      //   console.log("isNewUser: " + JSON.stringify(isNewUser));

      if (user) {
        token.userCustom = user;
      }

      return token;
    },
  },
});
