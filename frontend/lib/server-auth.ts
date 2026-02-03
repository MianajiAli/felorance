import { cookies } from "next/headers";

export const getAccessToken = () => {
  const cookieStore = cookies();
  return cookieStore.get("felorance-access")?.value ?? null;
};
