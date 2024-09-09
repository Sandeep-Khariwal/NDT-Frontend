
export interface FormValue {
    department: string,
    partName: string,
    heatNumber: string,
}

export interface SubDepartment {
    name:string,
    _id:string,
    departmentParts:any[]
}

export interface Part {
    _id: string;
    name:string;
    heatNumber:string;
    status:string;
    incomingTime:string;
    releaseTime:string;
    holdTime:string;
    department:string
    incomingDate:string
    releaseDate:string
}