export interface Reminder {
    id: number;
    title: string;
    description: string;
    dueDate: Date | undefined;
    isImportant: boolean;
  }
  