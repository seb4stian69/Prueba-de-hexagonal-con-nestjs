export class GetAllBuysByUserIDQuery{
    constructor(
        readonly userID:string,
        readonly shopID:string
    ){}
}