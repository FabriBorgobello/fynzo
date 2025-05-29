import { FileText } from "lucide-react";

import { Form } from "@/services/ai/tools/forms";

export function DocumentLinkCard({ form }: { form: Form }) {
  return (
    <div
      className="bg-card hover:border-foreground/25 hover:bg-card/50 group flex w-full cursor-pointer items-start gap-3 rounded-lg border p-4 transition-all duration-200 hover:shadow-md"
      onClick={() => window.open(form.link, "_blank")}
    >
      {/* Logo */}
      <div className="flex-shrink-0">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 transition-colors group-hover:bg-blue-100">
          <FileText className="h-6 w-6 text-blue-600" />
        </div>
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <h3 className="group-hover:text-primary text-foreground mb-1 text-sm leading-5 font-medium transition-colors">
          {form.title}
        </h3>
        <p className="text-muted-foreground line-clamp-2 text-xs">{form.description}</p>
      </div>
    </div>
  );
}
