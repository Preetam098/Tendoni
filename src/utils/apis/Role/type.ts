export interface RoleInformation {
    name: string;
    id: string,
    permission: string[];
    Status: string;
  }
  
  export interface RolePutInformation {
    name: string;
    id: string;
    permission: [];
    Status: string;
  }
  export interface roleUpdateInformation {
    name: string;
    roleId: string,
    permission: string[];
    Status: string;
  }