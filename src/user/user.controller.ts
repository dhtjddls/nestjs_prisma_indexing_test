import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':email')
  async findOneByEmail(@Param('email') email: string) {
    return await this.userService.findOne(email);
  }

  @Get('firstname/:firstname')
  async findOneByFirstName(@Param('firstname') firstname: string) {
    return await this.userService.findOneByFirstName(firstname);
  }
}
