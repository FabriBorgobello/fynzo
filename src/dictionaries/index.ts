import "server-only";

const dictionaries = {
  en: () => import("./en.json").then((module) => module.default),
  es: () => import("./es.json").then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;

export type Dictionary = {
  navbar: {
    home: string;
    invoices: string;
    expenses: string;
    agent: string;
    signIn: string;
    signOut: string;
    new: string;
  };
  invoices: {
    title: string;
    description: string;
    export: string;
    newInvoice: string;
    searchPlaceholder: string;
    status: string;
    date: string;
    recipient: string;
    invoiceNumber: string;
    amount: string;
    noInvoicesFound: string;
    showing: string;
    of: string;
    invoicesLower: string;
    previous: string;
    next: string;
    actions: string;
    download: string;
    print: string;
    email: string;
    delete: string;
    statuses: {
      paid: string;
      pending: string;
      overdue: string;
      all: string;
    };
  };
  expenses: {
    title: string;
    description: string;
    export: string;
    newExpense: string;
    searchPlaceholder: string;
    category: string;
    status: string;
    date: string;
    merchant: string;
    expenseId: string;
    amount: string;
    noExpensesFound: string;
    showing: string;
    of: string;
    expensesLower: string;
    previous: string;
    next: string;
    actions: string;
    viewReceipt: string;
    download: string;
    email: string;
    changeCategory: string;
    delete: string;
    categories: {
      all: string;
      travel: string;
      office: string;
      meals: string;
      supplies: string;
      other: string;
    };
    statuses: {
      all: string;
      approved: string;
      pending: string;
      rejected: string;
    };
  };
  agent: {
    title: string;
    description: string;
    welcome: string;
    welcomeDescription: string;
    inputPlaceholder: string;
    quickActions: {
      taxDeductions: {
        title: string;
        description: string;
      };
      filingStatus: {
        title: string;
        description: string;
      };
      taxCredits: {
        title: string;
        description: string;
      };
      deadline: {
        title: string;
        description: string;
      };
    };
  };
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]();
};
