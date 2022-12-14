import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { DriversService } from './drivers.service';
import { Driver } from './entities/driver.entity';
import { CreateDriverInput } from './dto/create-driver.input';
import { UpdateDriverInput } from './dto/update-driver.input';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';

@Resolver(() => Driver)
export class DriversResolver {
  constructor(private readonly driversService: DriversService) {}

  @Mutation(() => Driver)
  createDriver(@Args('createDriverInput') createDriverInput: CreateDriverInput) {
    return this.driversService.create(createDriverInput);
  }

  @Query(() => [Driver], { name: 'drivers' })
  findAll() {
    return this.driversService.findAll();
  }

  @Query(() => Driver, { name: 'driver' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.driversService.findOne(id);
  }

  @Mutation(() => Driver)
  updateDriver(@Args('updateDriverInput') updateDriverInput: UpdateDriverInput) {
    return this.driversService.update(updateDriverInput.id, updateDriverInput);
  }

  @Mutation(() => Driver)
  removeDriver(@Args('id', { type: () => Int }) id: number) {
    return this.driversService.remove(id);
  }

  @ResolveField(returns => [Vehicle])
  vehicles(@Parent() driver: Driver): Promise<Vehicle[]> {
	return this.driversService.getVehiclesByDriverId(driver.id);
  }
}
