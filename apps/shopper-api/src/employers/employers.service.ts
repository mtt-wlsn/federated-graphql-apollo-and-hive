import { Injectable } from '@nestjs/common';
import { CreateEmployerInput } from './dto/create-employer.input';
import { UpdateEmployerInput } from './dto/update-employer.input';
import { Employer } from './entities/employer.entity';

@Injectable()
export class EmployersService {
  create(createEmployerInput: CreateEmployerInput) {
    const employer: Employer = {
      id: crypto.randomUUID(),
      legalName: createEmployerInput.legalName,
      dbaName: createEmployerInput.dbaName,
      yearsInBusiness: createEmployerInput.yearsInBusiness,
    };

    this.employers.push(employer);

    return employer;
  }

  findOne(id: string) {
    console.log(`EmployersService.findOne ${id}`);
    return this.employers.find((x) => x.id == id);
  }

  findAll() {
    console.log(`EmployersService.findAll`);
    return this.employers;
  }

  findManyEmployersByIds(employerIds: string[]) {
    console.log(`EmployersService.findManyEmployersByIds ${employerIds}`);
    return this.employers.filter((x) => employerIds.includes(x.id));
  }

  findEmployersByBatch(employerIds: string[]): (Employer | any)[] {
    const employers = this.findManyEmployersByIds(employerIds);
    // DataLoader requires the mappedEmployers to be in the same order as the
    // input employerIds.
    return employerIds.map((employerId) => {
      const employer = employers.filter(
        (employer) => employer.id === employerId,
      );
      return employer ? employer[0] : null;
    });
  }

  update(id: string, updateEmployerInput: UpdateEmployerInput) {
    const employer = this.employers.find((x) => x.id == id);

    if (!employer) return;

    employer.legalName = updateEmployerInput.legalName ?? employer.legalName;
    employer.dbaName = updateEmployerInput.dbaName ?? employer.dbaName;
    employer.yearsInBusiness =
      updateEmployerInput.yearsInBusiness ?? employer.yearsInBusiness;

    return employer;
  }

  remove(id: string) {
    const employerIndex = this.employers.findIndex((x) => x.id == id);

    if (employerIndex < 0) return;

    this.employers.splice(employerIndex, 1);
  }

  employers: Employer[] = [
    {
      id: 'fe2d6f47-946e-4eb6-a6b3-cf97efb8aef9',
      legalName: 'James Corner Barber Shop LLC',
      dbaName: 'The Corner Barber Shop',
      yearsInBusiness: 120,
    },
    {
      id: 'ea772960-03ed-443c-b389-ad056d3501db',
      legalName: 'ACME INC.',
      dbaName: 'A Company that Makes Everything',
      yearsInBusiness: 2,
      headquarterAddressId: '493735c6-687b-46c2-99b1-aef7acf5b92b',
    },
    {
      id: 'a5462b29-7eb8-4a9d-aa70-a0f1a1bfe516',
      legalName: 'Papa Mikes BBQ LLC',
      dbaName: 'Papa Mikes BBQ',
      yearsInBusiness: 13,
      headquarterAddressId: '3d0d6053-eb4f-4d69-a43b-0e4cc1e51092',
    },
    {
      id: '9eea4447-24b3-4e37-8920-b09ddbbafc79',
      legalName: 'Car.com Inc.',
      dbaName: 'Car Dot Com',
      yearsInBusiness: 4,
    },
  ];
}
