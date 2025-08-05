import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import { functions } from "@/lib/inngest/functions/functions";

console.log("Inngest client ID:", inngest.id);
console.log("Number of functions:", functions.length);
console.log(
  "Function details:",
  functions.map((f) => ({
    id: f.id,
    name: f.name,
  }))
);

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions,
});
