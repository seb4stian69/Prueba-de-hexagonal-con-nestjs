import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { UserD, UserRepository } from "../../Common/Repository/UserRepository";
import { GetUserQuery } from "./Query/GetUserQuery";

/* + ------------------------------ | Users | ------------------------------ + */
@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(
    private readonly userRepository:UserRepository
  ) {}
  async execute(query: GetUserQuery):  Promise<UserD> {
    return await this.userRepository.getUser(query.userID);
  }
}