import { CategoryHttpService } from '../../services/categoryhttpservice';
import axios from 'axios';
import {
  mockCategoryResponseObject,
  mockSingleCategoryResponse,
  mockPostCategoryResponse,
  mockDeleteCategoryResponse,
  mockCategories,
} from '../mocks/categoryMockData';
import { Category } from '../../models/category';

// Mock axios module
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CategoryHttpService', () => {
  let service: CategoryHttpService;

  beforeEach(() => {
    service = new CategoryHttpService();
    mockedAxios.get.mockReset();
    mockedAxios.post.mockReset();
    mockedAxios.put.mockReset();
    mockedAxios.delete.mockReset();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCategories', () => {
    it('should fetch all categories successfully', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockCategoryResponseObject });

      const result = await service.getCategories();

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://coreapiforreact-aed8a3azbaeba6ep.eastus-01.azurewebsites.net/api/CategoryRead'
      );
      expect(result).toEqual(mockCategoryResponseObject);
      expect(result.Records).toHaveLength(3);
      expect(result.StatusCode).toBe(200);
    });

    it('should handle error when fetching categories fails', async () => {
      const errorMessage = 'Network Error';
      mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(service.getCategories()).rejects.toThrow(errorMessage);
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCategoryById', () => {
    it('should fetch a category by id successfully', async () => {
      const categoryId = 'CAT001';
      mockedAxios.get.mockResolvedValueOnce({ data: mockSingleCategoryResponse });

      const result = await service.getCategoryById(categoryId);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `https://coreapiforreact-aed8a3azbaeba6ep.eastus-01.azurewebsites.net/api/CategoryRead/${categoryId}`
      );
      expect(result).toEqual(mockSingleCategoryResponse);
      expect(result.Record.CategoryId).toBe('CAT001');
    });

    it('should handle error when category not found', async () => {
      const categoryId = 'INVALID';
      mockedAxios.get.mockRejectedValueOnce(new Error('Category not found'));

      await expect(service.getCategoryById(categoryId)).rejects.toThrow('Category not found');
    });
  });

  describe('postCategory', () => {
    it('should create a new category successfully', async () => {
      const newCategory = new Category(0, 'CAT004', 'Books', 300);
      mockedAxios.post.mockResolvedValueOnce({ data: mockPostCategoryResponse });

      const result = await service.postCategory(newCategory);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://coreapiforreact-aed8a3azbaeba6ep.eastus-01.azurewebsites.net/api/CategoryWrite',
        newCategory,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      expect(result).toEqual(mockPostCategoryResponse);
      expect(result.StatusCode).toBe(201);
      expect(result.Record.CategoryName).toBe('Books');
    });

    it('should handle error when creating category fails', async () => {
      const newCategory = new Category(0, 'CAT004', 'Books', 300);
      mockedAxios.post.mockRejectedValueOnce(new Error('Validation Error'));

      await expect(service.postCategory(newCategory)).rejects.toThrow('Validation Error');
    });
  });

  describe('putCategory', () => {
    it('should update a category successfully', async () => {
      const updatedCategory = new Category(1, 'CAT001', 'Updated Electronics', 1500);
      const updateResponse = {
        ...mockSingleCategoryResponse,
        Record: updatedCategory,
      };
      mockedAxios.put.mockResolvedValueOnce({ data: updateResponse });

      const result = await service.putCategory(updatedCategory);

      expect(mockedAxios.put).toHaveBeenCalledWith(
        `https://coreapiforreact-aed8a3azbaeba6ep.eastus-01.azurewebsites.net/api/CategoryWrite/${updatedCategory.CategoryId}`,
        updatedCategory,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      expect(result.Record.CategoryName).toBe('Updated Electronics');
      expect(result.Record.BasePrice).toBe(1500);
    });

    it('should handle error when updating category fails', async () => {
      const updatedCategory = new Category(1, 'CAT001', 'Updated Electronics', 1500);
      mockedAxios.put.mockRejectedValueOnce(new Error('Update failed'));

      await expect(service.putCategory(updatedCategory)).rejects.toThrow('Update failed');
    });
  });

  describe('deleteCategoryById', () => {
    it('should delete a category successfully', async () => {
      const categoryId = 'CAT001';
      mockedAxios.delete.mockResolvedValueOnce({ data: mockDeleteCategoryResponse });

      const result = await service.deleteCategoryById(categoryId);

      expect(mockedAxios.delete).toHaveBeenCalledWith(
        `https://coreapiforreact-aed8a3azbaeba6ep.eastus-01.azurewebsites.net/api/CategoryRead/${categoryId}`
      );
      expect(result).toEqual(mockDeleteCategoryResponse);
      expect(result.StatusCode).toBe(200);
    });

    it('should handle error when deleting category fails', async () => {
      const categoryId = 'CAT001';
      mockedAxios.delete.mockRejectedValueOnce(new Error('Delete failed'));

      await expect(service.deleteCategoryById(categoryId)).rejects.toThrow('Delete failed');
    });
  });
});
