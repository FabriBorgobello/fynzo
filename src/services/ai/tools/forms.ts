import { z } from "zod";

export const availableFormsSchema = z.enum(["130", "100", "036", "303", "390", "349"]);

export type AvailableForms = z.infer<typeof availableFormsSchema>;

export type Form = { code: AvailableForms; title: string; link: string; description: string };

export const FORMS: Form[] = [
  {
    code: "130",
    link: "https://www12.agenciatributaria.gob.es/wlpl/PAMW-M130/E2025/CONT/index.zul",
    title: "Modelo 130",
    description: "Pago fraccionado del Impuesto sobre la Renta de las Personas Físicas.",
  },
  {
    code: "100",
    link: "https://sede.agenciatributaria.gob.es/static_files/common/html/selector_acceso/SelectorAccesos.html?rep=S&ref=%2Fwlpl%2FDASR-CORE%2FAccesoDR2024RVlt&aut=CPRE",
    title: "Modelo 100",
    description: "Impuesto sobre la Renta de las Personas Físicas. Declaración anual.",
  },
  {
    code: "036",
    link: "https://sede.agenciatributaria.gob.es/static_files/common/html/selector_acceso/SelectorAccesos.html?rep=S&ref=%2Fwlpl%2FBU36-M036%2FMOD036%2Findex.zul&aut=CP",
    title: "Modelo 036",
    description: "Censo de empresarios, profesionales y retenedores - Declaración censal de alta, modificación y baja.",
  },
  {
    code: "303",
    link: "https://sede.agenciatributaria.gob.es/static_files/common/html/selector_acceso/SelectorAccesos.html?ref=%2Fwlpl%2FBUGC-JDIT%2FVentanaCensalIva%3Fforigen%3Dpre303&aut=CPE",
    title: "Modelo 303",
    description: "IVA. Autoliquidación.",
  },
  {
    code: "390",
    link: "https://sede.agenciatributaria.gob.es/static_files/common/html/selector_acceso/SelectorAccesos.html?ref=%2Fwlpl%2FPAIV-M390%2FE2024%2FCONT%2Findex.zul&aut=CPE",
    title: "Modelo 390",
    description: "IVA. Declaración Resumen Anual.",
  },
  {
    code: "349",
    link: "https://sede.agenciatributaria.gob.es/static_files/common/html/selector_acceso/SelectorAccesos.html?ref=%2Fwlpl%2FOVPT-NTGV%2FTGVIOnline%3Fmodelo%3D349%26ejercicio%3D2025&aut=CP",
    title: "Modelo 349",
    description: "Declaración Informativa. Declaración recapitulativa de operaciones intracomunitarias.",
  },
];
