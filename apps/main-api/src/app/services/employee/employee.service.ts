import { Injectable } from '@nestjs/common';
import {Model} from 'mongoose'
import {InjectModel} from '@nestjs/mongoose'
import { Employee } from '../../models/interfaces/employee.interface'
import {CreateEmployeeDTO} from '../../dto/create-employee.dto'

@Injectable()
export class EmployeeService {

    constructor(@InjectModel('Employee') private readonly employeeModel: Model<Employee>) { }

    async getEmployee(offset,limit): Promise<Employee[]> {
        const employee = await this.employeeModel.find().skip(Number(offset)).limit(Number(limit)).exec()
        return employee
    }

    async getEmployees(employeeID): Promise<Employee> {
        const employee = await this.employeeModel
            .findById(employeeID)
            .exec();
        return employee;    
    }

    async addEmployee(createEmployeeDTO: CreateEmployeeDTO): Promise<Employee> {
        const newEmployee = await this.employeeModel(createEmployeeDTO)
        return newEmployee.save()
    }

    async editEmployee(employeeID, createEmployeeDTO: CreateEmployeeDTO): Promise<Employee>{
        const editedEmployee = await this.employeeModel
                .findByIdAndUpdate(employeeID, createEmployeeDTO, {new:true});
        return editedEmployee;
    }

    async deleteEmployee(employeeID): Promise<any> {
        const deleteEmployee = await this.employeeModel
                .findByIdAndRemove(employeeID);
        return deleteEmployee;
    }
}