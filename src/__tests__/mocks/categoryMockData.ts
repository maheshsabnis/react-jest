import type { ResponseObject } from '../../models/responseobject';
import type { Category } from '../../models/category';

export const mockCategories: Category[] = [
  {
    CategoryRecordId: 1,
    CategoryId: 'CAT001',
    CategoryName: 'Electronics',
    BasePrice: 1000,
  },
  {
    CategoryRecordId: 2,
    CategoryId: 'CAT002',
    CategoryName: 'Furniture',
    BasePrice: 2000,
  },
  {
    CategoryRecordId: 3,
    CategoryId: 'CAT003',
    CategoryName: 'Clothing',
    BasePrice: 500,
  },
];

export const mockCategoryResponseObject: ResponseObject<Category> = {
  Records: mockCategories,
  Record: mockCategories[0],
  StatusCode: 200,
  Message: 'Success',
};

export const mockSingleCategoryResponse: ResponseObject<Category> = {
  Records: [],
  Record: mockCategories[0],
  StatusCode: 200,
  Message: 'Success',
};

export const mockPostCategoryResponse: ResponseObject<Category> = {
  Records: [],
  Record: {
    CategoryRecordId: 4,
    CategoryId: 'CAT004',
    CategoryName: 'Books',
    BasePrice: 300,
  },
  StatusCode: 201,
  Message: 'Created Successfully',
};

export const mockDeleteCategoryResponse: ResponseObject<Category> = {
  Records: [],
  Record: mockCategories[0],
  StatusCode: 200,
  Message: 'Deleted Successfully',
};
