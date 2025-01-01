export interface IAccessGroup {
  accessGroupID: string;
  name: string;
  accessList: string[];
}

export type CreateAccessGroupDTO = IAccessGroup;
export type UpdateAccessGroupDTO = Partial<IAccessGroup>;