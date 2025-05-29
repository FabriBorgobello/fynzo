"use client";

import { ToolInvocationUIPart } from "@ai-sdk/ui-utils";
import { useQuery } from "@tanstack/react-query";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type ComunidadesSelectorMsg = { type: "onComunidadAutonomaChange"; toolCallId: string; value: string };

async function getComunidadesAutonomas(): Promise<string[]> {
  try {
    const res = await fetch("https://datos.gob.es/apidata/nti/territory/Autonomous-region?_pageSize=1000");
    const data = await res.json();
    return data.result.items.map((item: { label: string }) => item.label);
  } catch (error) {
    console.error("Error fetching comunidades autónomas", error);
    return [];
  }
}

export function ComunidadesSelector({
  part,
  onMsg,
}: {
  part: ToolInvocationUIPart;
  onMsg: (msg: ComunidadesSelectorMsg) => void;
}) {
  const toolCallId = part.toolInvocation.toolCallId;
  const { data: comunidades, status } = useQuery({
    queryKey: ["comunidades-autonomas"],
    queryFn: () => getComunidadesAutonomas(),
  });

  if (status === "pending") return null;
  if (status === "error")
    return (
      <div className="flex flex-col gap-2">
        <p>{part.toolInvocation.args.question}</p>
        <p className="text-red-600">Error</p>
      </div>
    );

  return (
    <div className="flex flex-col gap-2">
      <p>{part.toolInvocation.args.question}</p>
      <Select onValueChange={(value) => onMsg({ type: "onComunidadAutonomaChange", toolCallId, value })}>
        <SelectTrigger className="text-primary w-full bg-white">
          <SelectValue placeholder="Selecciona una comunidad autónoma" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Comunidades Autónomas</SelectLabel>
            {comunidades.map((comunidad) => (
              <SelectItem key={comunidad} value={comunidad}>
                {comunidad}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
