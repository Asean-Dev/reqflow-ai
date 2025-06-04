export function addContext(products: {
  company?: string;
  business_problem?: string;
  kpi?: string;
  budget?: string;
  purpose?: string;
  scope_summary?: string;
}): boolean {
  try {
    const expiresAt = Date.now() + 10 * 60 * 1000;
    localStorage.setItem(
      "_context",
      JSON.stringify({ context: products, expiresAt })
    );

    return true;
  } catch (error) {
    console.error("Failed to set context:", error);
    return false;
  }
}

export function removeFromContext(): boolean {
  try {
    localStorage.removeItem("_context");
    return true;
  } catch (error) {
    console.error("Failed to remove from context:", error);
    return false;
  }
}

export function getContextFromLocalStorage(): {
  context: {
    fields: {
      company?: string;
      business_problem?: string;
      kpi?: string;
      budget?: string;
      purpose?: string;
      scope_summary?: string;
    };
  };
} {
  try {
    const contextRaw = localStorage.getItem("_context");
    const context = contextRaw ? JSON.parse(contextRaw) : [];
    return context;
  } catch (error) {
    console.error("Failed to get context from local storage:", error);
    return { context: { fields: {} } };
  }
}
