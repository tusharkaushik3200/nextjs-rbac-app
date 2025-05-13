export const dynamic = 'force-dynamic';

import NextAuth from "next-auth";
import { authOptions } from "../authOptions"; // Import from authOptions.ts

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
