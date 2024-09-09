export interface AuthData {
    name?: string;
    email: string;
    password: string;
  }

export interface Department {
    _id: string;                       
    email: string;                 
    password: string;               
    name: string;        
    subDepartments: string[];        
    departmentParts: string[];    
    admin: boolean;                 
    isDeleted: boolean;           
    __v: number;                  
  }
  