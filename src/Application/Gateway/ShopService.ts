import { Shop, ShopD } from "src/Domain/Shop";

export interface ShopService {
    getShopById(id: string): Promise<ShopD>;
}