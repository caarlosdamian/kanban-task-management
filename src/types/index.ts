export interface Board {
  name: string;
  columns: Column[];
  isActive: boolean;
  id: any;
}

export interface Column {
  name: string;
  tasks: (Task | Task)[];
}

export interface Task {
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
}

export interface Subtask {
  title: string;
  isCompleted: boolean;
}

export interface SelectedItemI extends Task {
  taskIndex?: number;
  colIndex?: number;
}
