import { tool } from "ai";
import { z } from "zod";

export const getTaxDomicileForm = tool({
  description:
    "Get the form 030. Useful when the user wants to change their tax address. The user will fill the form and send by themselves.",
  parameters: z.object({}),
  execute: async () => {
    return {
      form: "https://sede.agenciatributaria.gob.es/static_files/Sede/Procedimiento_ayuda/G321/mod030_es_es.pdf",
    };
  },
});

export const presentTaxDomicileForm = tool({
  description: "Present the form 030 in the name of the user. Useful when the user wants to change their tax address.",
  parameters: z.object({ address: z.string().describe("The new tax address") }),
  execute: async ({ address }) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
      message: `Successfully presented the form 030. The new tax address is ${address}.`,
      receipt: "https://sede.agenciatributaria.gob.es/static_files/Sede/Procedimiento_ayuda/G321/mod030_es_es.pdf",
    };
  },
});
