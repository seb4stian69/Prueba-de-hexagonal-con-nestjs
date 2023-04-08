export class GetProductsByIdInShopQuery{
    constructor(
        readonly shopID:string,
        readonly productID:string
    ){}
}