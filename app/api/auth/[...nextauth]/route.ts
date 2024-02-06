import { db } from "@/database/database"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    adapter: DrizzleAdapter(db),
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const user = await db.user.findFirst({
                    where: {
                        email: credentials.email,
                    },
                })


            },
        }),
    ],

})

export { handler as GET, handler as POST }