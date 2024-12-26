import {TasksModel} from "./tasks.model";

export interface Category {
  id: number;
  name: string;
  tasks: TasksModel[];
}
