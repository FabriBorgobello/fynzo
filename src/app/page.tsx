"use client";

import { useState } from "react";

import { CheckCircle, FileText, Users, Zap } from "lucide-react";
import type React from "react";
import { z, ZodError } from "zod/v4";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function FynzoWaitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      const parsed = z.email().parse(email);
      const body = new URLSearchParams({ email: parsed });
      const url =
        "https://script.google.com/macros/s/AKfycbxrXUHI3vo-X37FGHGsReUNfBMzsb2G-sIPv0eFIhHcDBZ8ZzQAsiZ_4X0imSrXs7gnQw/exec";
      await fetch(url, { method: "POST", body: body });
      setStatus("success");
      setEmail("");
    } catch (err) {
      setError(
        err instanceof ZodError
          ? "Por favor, ingresa un email válido."
          : "Ocurrió un error al enviar tu email. Por favor, inténtalo de nuevo.",
      );
      setStatus("error");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-500/30 via-white to-green-500/30 p-4">
      <Card className="mx-auto w-full max-w-md border-0 bg-white/80 shadow-2xl backdrop-blur-sm">
        <CardContent className="p-6 text-center md:p-8">
          {/* Logo/Brand */}
          <div className="mb-6">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-green-600">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900">Fynzo</h1>
            <div className="mx-auto h-1 w-12 rounded-full bg-gradient-to-r from-blue-600 to-green-600"></div>
          </div>

          {/* Main Heading */}
          <h2 className="mb-3 text-2xl leading-tight font-bold text-gray-900">Tu gestor fiscal inteligente</h2>

          {/* Catchy Phrase */}
          <p className="mb-4 text-lg font-semibold text-blue-600">Recupera tu tranquilidad</p>

          {/* Description */}
          <p className="mb-6 leading-normal text-gray-600">
            Te acompañamos en los trámites difíciles y confusos. Más seguridad, menos complicaciones y más libertad para
            lo que realmente importa.
          </p>

          {/* Features */}
          <div className="mb-8 grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <Zap className="h-4 w-4 text-blue-600" />
              <span className="text-xs md:text-base">Más eficiencia</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-xs md:text-base">Mayor seguridad</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <FileText className="h-4 w-4 text-blue-600" />
              <span className="text-xs md:text-base">Trámites claros</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <Users className="h-4 w-4 text-green-600" />
              <span className="text-xs md:text-base">Siempre disponible</span>
            </div>
          </div>

          {/* Email Form */}
          {status !== "success" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                autoComplete="email"
                autoFocus
                autoCapitalize="off"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded border-2 px-4 py-3 text-center text-gray-900 placeholder-gray-500 focus:ring-0"
              />
              <Button
                type="submit"
                className="w-full transform rounded bg-gradient-to-r from-blue-600 to-green-600 py-3 font-semibold text-white transition-all duration-200 hover:scale-[1.01] hover:from-blue-700 hover:to-green-700"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Enviando..." : "Únete a la lista de espera"}
              </Button>
            </form>
          )}
          {status === "success" && (
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-900">¡Perfecto!</h3>
              <p className="text-gray-600">
                Te avisaremos cuando Fynzo esté listo para simplificar tus trámites fiscales.
              </p>
            </div>
          )}
          {status === "error" && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
