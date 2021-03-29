import { NextApiResponse } from "next";
import { withIronSession } from "next-iron-session";
import { ExtendedRequest } from "../pages/api";

export default function withSession(
  handler: (req: ExtendedRequest, res: NextApiResponse) => Promise<void>
) {
  const secret = process.env.SECRET;
  if (!secret) throw new Error("No secret found");

  return withIronSession(handler, {
    password: secret,
    cookieName: "todolist",
    cookieOptions: {
      // the next line allows to use the session in non-https environments like
      // Next.js dev mode (http://localhost:3000)
      secure: process.env.NODE_ENV === "production",
    },
    ttl: 3649635 * 24 * 60 * 60, // = 3649635 days: 9999 years.,
  });
}
