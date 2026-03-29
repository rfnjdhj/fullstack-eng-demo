export const isValidTodoName = (name: string): boolean => {
  return name.length > 0 && name.length <= 100;
};

export const formatTodoDescription = (description: string): string => {
  return description.trim().charAt(0).toUpperCase() + description.trim().slice(1);
};

export const calculateTodoStatus = (status: boolean): string => {
  return status ? 'Completed' : 'Pending';
};
