export interface RootObject {
  boards: Board[];
}

export interface Board {
  name: string;
  columns: Column[];
  isActive: boolean;
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