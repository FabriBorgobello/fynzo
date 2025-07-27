import { InferToolOutput, InferUITools, UIMessage } from "ai";

import { tools } from "@/services/ai/tools";

export type CustomDataTypes = {
  getRelevantContext: InferToolOutput<typeof tools.getRelevantContext>;
  getComunidadAutonoma: InferToolOutput<typeof tools.getComunidadAutonoma>;
  getFormsLinks: InferToolOutput<typeof tools.getFormsLinks>;
};
export type CustomTools = InferUITools<typeof tools>;
export type CustomUIMessage = UIMessage<unknown, CustomDataTypes, CustomTools>;
