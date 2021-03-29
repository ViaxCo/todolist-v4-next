import { Session } from "next-iron-session";

export default (session: Session) => {
  const userExists = session.get("user");
  return userExists;
};
