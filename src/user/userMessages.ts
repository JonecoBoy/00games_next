
export const userMessages = {
    min: (field: string, length: number) =>
      `O campo "${field}" must have at least ${length} letters.`,
    max: (field: string, length: number) =>
      `O campo "${field}" must have a maximum of ${length} letters.`,
  };