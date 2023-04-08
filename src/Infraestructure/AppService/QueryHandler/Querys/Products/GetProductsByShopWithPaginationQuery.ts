export class GetProductsByShopWithPaginationQuery{
    constructor(
        readonly shopID: string,
        readonly page: number,
        readonly limit: number
    ){}
}