import EmailProvider from "next-auth/providers/email"
import { PlanetScaleAdapter } from "@/database/adapter";
import { createTransport } from "nodemailer";
import { db } from "@/database/conn"
import { generateMagicLink } from "@/lib/mail/magic-link";
import { NextAuthOptions } from "next-auth";

export const authConfig: NextAuthOptions = {
    // @ts-ignore
    adapter: PlanetScaleAdapter(db),
    providers: [
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: Number(process.env.EMAIL_SERVER_PORT),
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD
                }
            },

            from: "noreply@fiestas-flavor.com",

            sendVerificationRequest: async ({ identifier: email, url, provider: { server, from } }) => {
                const { host } = new URL(url);
                // Place your whitelisted emails below

                const transport = createTransport(server);
                const result = await transport.sendMail({
                    to: email,
                    from: from,
                    subject: `My Project - Sign in to ${host}`,
                    html: generateMagicLink(
                        host,
                        url,
                        email
                    )
                });
                const failed = result.rejected.concat(result.pending).filter(Boolean);
                if (failed.length) {
                    throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`);
                }
            },
        }),


    ],

    pages: {
        signIn: "/signin",
        error: "/error",
        verifyRequest: "/verify-request",
    },

    secret: process.env.SECRET,
}