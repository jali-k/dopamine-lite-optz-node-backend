export interface IClass {
  classID: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ClassAttributes = IClass;
export type ClassCreationAttributes = Omit<IClass, 'classID' | 'createdAt' | 'updatedAt'>;

export type CreateClassDTO = ClassCreationAttributes;
export type UpdateClassDTO = Partial<IClass>;