
export interface ProductModel {

    productName: string,
    productBrand: string,
    productDateEntry: Date,
    productOwner: string,
    productDescription: string,
    productPrice: number,

    productStockname: {
        stockCategoryId: string,
        stockCategoryname: string
   }

   productStockCatNumber: {
    stockCateId: string,
    stockCarNumber: number
   }
   createdAt: Date
    

}
