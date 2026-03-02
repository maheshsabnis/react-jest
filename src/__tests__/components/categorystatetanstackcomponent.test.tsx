import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CategoryStateTanstackQueryComponent from '../../components/tanstackqueryexample/categorystatetanstackcomponent';
import { CategoryHttpService } from '../../services/categoryhttpservice';
import { mockCategoryResponseObject, mockCategories, mockPostCategoryResponse } from '../mocks/categoryMockData';
import { Category } from '../../models/category';

// Mock the CategoryHttpService
jest.mock('../../services/categoryhttpservice');

describe('CategoryStateTanstackQueryComponent', () => {
  let queryClient: QueryClient;
  let mockService: jest.Mocked<CategoryHttpService>;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    mockService = {
      getCategories: jest.fn(),
      getCategoryById: jest.fn(),
      postCategory: jest.fn(),
      putCategory: jest.fn(),
      deleteCategoryById: jest.fn(),
    } as any;

    (CategoryHttpService as jest.Mock).mockImplementation(() => mockService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  const renderComponent = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <CategoryStateTanstackQueryComponent />
      </QueryClientProvider>
    );
  };

  describe('Loading and Display', () => {
    it('should display loading state initially', () => {
      mockService.getCategories.mockImplementation(
        () => new Promise(() => {}) // Never resolves
      );

      renderComponent();

      expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    });

    it('should display categories after successful fetch', async () => {
      mockService.getCategories.mockResolvedValueOnce(mockCategoryResponseObject);

      renderComponent();

      await waitFor(() => {
        expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
      });

      expect(mockService.getCategories).toHaveBeenCalledTimes(1);
    });

    it('should display error message when fetch fails', async () => {
      const errorMessage = 'Failed to fetch categories';
      mockService.getCategories.mockRejectedValueOnce(new Error(errorMessage));

      renderComponent();

      await waitFor(() => {
        expect(screen.getByText(/Error in Loading data/i)).toBeInTheDocument();
      });
    });
  });

  describe('Form Interactions', () => {
    beforeEach(async () => {
      mockService.getCategories.mockResolvedValueOnce(mockCategoryResponseObject);
    });

    it('should render form fields with initial empty state', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
      });

      const categoryIdInput = screen.getByPlaceholderText(/Enter record is/i);
      const categoryNameInput = screen.getByPlaceholderText(/Enter Category Name/i);

      expect(categoryIdInput).toHaveValue('');
      expect(categoryNameInput).toHaveValue('');
    });

    it('should update form fields when typing', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
      });

      const categoryIdInput = screen.getByPlaceholderText(/Enter record is/i);
      const categoryNameInput = screen.getByPlaceholderText(/Enter Category Name/i);

      fireEvent.change(categoryIdInput, { target: { value: 'CAT005' } });
      fireEvent.change(categoryNameInput, { target: { value: 'New Category' } });

      expect(categoryIdInput).toHaveValue('CAT005');
      expect(categoryNameInput).toHaveValue('New Category');
    });

    it('should clear form when Clear button is clicked', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
      });

      const categoryIdInput = screen.getByPlaceholderText(/Enter record is/i);
      const categoryNameInput = screen.getByPlaceholderText(/Enter Category Name/i);
      const clearButton = screen.getByText('Clear');

      fireEvent.change(categoryIdInput, { target: { value: 'CAT005' } });
      fireEvent.change(categoryNameInput, { target: { value: 'Test' } });

      fireEvent.click(clearButton);

      expect(categoryIdInput).toHaveValue('');
      expect(categoryNameInput).toHaveValue('');
    });
  });

  describe('Save Functionality', () => {
    it('should call postCategory when Save button is clicked', async () => {
      mockService.getCategories.mockResolvedValueOnce(mockCategoryResponseObject);
      mockService.postCategory.mockResolvedValueOnce(mockPostCategoryResponse);

      renderComponent();

      await waitFor(() => {
        expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
      });

      const categoryIdInput = screen.getByPlaceholderText(/Enter record is/i);
      const categoryNameInput = screen.getByPlaceholderText(/Enter Category Name/i);
      const saveButton = screen.getByText('Save');

      fireEvent.change(categoryIdInput, { target: { value: 'CAT005' } });
      fireEvent.change(categoryNameInput, { target: { value: 'Books' } });

      // Mock the second getCategories call after mutation
      mockService.getCategories.mockResolvedValueOnce({
        ...mockCategoryResponseObject,
        Records: [...mockCategories, mockPostCategoryResponse.Record],
      });

      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mockService.postCategory).toHaveBeenCalledWith(
          expect.objectContaining({
            CategoryId: 'CAT005',
            CategoryName: 'Books',
          })
        );
      });
    });

    it('should clear form after successful save', async () => {
      mockService.getCategories.mockResolvedValueOnce(mockCategoryResponseObject);
      mockService.postCategory.mockResolvedValueOnce(mockPostCategoryResponse);

      renderComponent();

      await waitFor(() => {
        expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
      });

      const categoryIdInput = screen.getByPlaceholderText(/Enter record is/i);
      const categoryNameInput = screen.getByPlaceholderText(/Enter Category Name/i);
      const saveButton = screen.getByText('Save');

      fireEvent.change(categoryIdInput, { target: { value: 'CAT005' } });
      fireEvent.change(categoryNameInput, { target: { value: 'Books' } });

      mockService.getCategories.mockResolvedValueOnce(mockCategoryResponseObject);

      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(categoryIdInput).toHaveValue('');
        expect(categoryNameInput).toHaveValue('');
      });
    });
  });

  describe('Component Title', () => {
    it('should display the correct title', async () => {
      mockService.getCategories.mockResolvedValueOnce(mockCategoryResponseObject);

      renderComponent();

      await waitFor(() => {
        expect(screen.getByText('Category Form Object')).toBeInTheDocument();
      });
    });
  });
});
