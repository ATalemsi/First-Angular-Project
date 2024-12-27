import {TasksModel} from "./tasks.model";

export interface Category {
  id: number;
  name: string;
  color?: string;
  tasks: TasksModel[];
}
