
export const checklistIconColors: Record<
  string,
  {
    background: string;
    color: string;
  }
> = {
  documents: {
    background: "#E8F5E9",
    color: "#2E7D32",
  },
  clothes: {
    background: "#F3E5F5",
    color: "#6D28D9",
  },
  electronics: {
    background: "#E8F0FE",
    color: "#2563EB",
  },
  household: {
    background: "#FFF3E0",
    color: "#F59E0B",
  },
  kitchen: {
    background: "#e0f3ff",
    color: "#5cb8f6",
  },
  health: {
    background: "#FCE4EC",
    color: "#EC4899",
  },
  miscellaneous: {
    background: "#fae3e3",
    color: "#f14444",
  },
};

export const checklistImportanceColors: Record<
  string,
  {
    background: string;
    color: string;
  }
> = {
  Essential: {
    background: "#E8F5E9",
    color: "#2E7D32",
  },
  Important: {
    background: "#F3E5F5",
    color: "#6D28D9",
  },
  Optional: {
    background: "#FFF3E0",
    color: "#F59E0B",
  },
};

const defaultColor = {
  background: "#F5F5F5",
  color: "#616161",
};

export const getChecklistIconColor = (
  iconKey: string,
) => {
  return (
    checklistIconColors[
      iconKey.toLowerCase()
    ] ?? defaultColor
  );
};

export const getChecklistImportanceColor = (
  importance: string,
) => {
  return (
    checklistImportanceColors[
      importance
    ] ?? defaultColor
  );
};

export const getChecklistProgressColor = (
  iconKey: string,
) => {
  return getChecklistIconColor(iconKey).color;
};