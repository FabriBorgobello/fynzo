import { z } from "zod";

export const invoiceSchema = z.object({
  invoiceNumber: z.string().describe("Unique identifier for the invoice, e.g., 'F00072023'"),
  invoiceDate: z.string().date().describe("Date the invoice was issued, formatted as YYYY-MM-DD"),
  dueDate: z
    .string()
    .date()
    .describe("Date the invoice becomes due. It may match the invoice date if immediate payment is expected"),
  from: z
    .object({
      name: z.string().describe("Name of the person or company issuing the invoice"),
      vatId: z.string().describe("VAT or tax identification number of the issuer"),
      address: z.string().describe("Postal address of the invoice issuer"),
    })
    .describe("Information about the invoice issuer (sender)"),
  to: z
    .object({
      name: z.string().describe("Name of the company or client receiving the invoice"),
      taxId: z.string().describe("Tax identification number of the recipient"),
      address: z.string().describe("Postal address of the recipient"),
    })
    .describe("Information about the invoice recipient"),
  items: z
    .array(
      z.object({
        describe: z.string().describe("Short describe of the service or product provided"),
        quantity: z.number().describe("Quantity of the item or service units"),
        unitPrice: z.number().describe("Price per unit or per service"),
        total: z.number().describe("Total price for this line item (quantity × unit price)"),
      }),
    )
    .describe("Line items in the invoice detailing services or goods provided"),
  subtotal: z.number().describe("Sum of all line item totals before taxes or discounts"),
  vat: z.number().min(0).describe("Value-added tax (VAT) amount applied to the subtotal, minimum 0"),
  irpf: z.number().min(0).describe("Personal income tax (IRPF) withholding amount, minimum 0"),
  total: z.number().describe("Final amount payable after applying VAT and subtracting IRPF"),
  paymentTerms: z
    .object({
      bankName: z.string().optional().describe("Name of the bank where payment should be made"),
      iban: z.string().describe("IBAN or bank account number to deposit the payment"),
    })
    .describe("Details about how the payment should be made"),
  notes: z
    .string()
    .optional()
    .describe("Any additional information, such as tax exemption clauses or legal references"),
});
