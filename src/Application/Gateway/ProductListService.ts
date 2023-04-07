import { Products } from "src/Domain/Commands/RegisterProductCommand";

export interface ListProductService {
    getProducts(): Promise<Products[]>
}