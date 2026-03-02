export class Category {
    public CategoryRecordId: number;
    public CategoryId: string;
    public CategoryName: string;
    public BasePrice: number;

    constructor(
        CategoryRecordId: number,
        CategoryId: string,
        CategoryName: string,
        BasePrice: number
    ) {
        this.CategoryRecordId = CategoryRecordId;
        this.CategoryId = CategoryId;
        this.CategoryName = CategoryName;
        this.BasePrice = BasePrice;
    }
}
