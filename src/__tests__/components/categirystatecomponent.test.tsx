import { render, screen, fireEvent } from '@testing-library/react';
import CategoryStateComponent from '../../components/categirystatecomponent';

describe('CategoryStateComponent', () => {

    beforeEach(() => {
        render(<CategoryStateComponent />);
    });

    // Helper to get input elements by their placeholder/label text
    // RecordId and BasePrice share the same placeholder, so use getAllBy
    const getRecordIdInput = () => {
        const inputs = screen.getAllByPlaceholderText('Enter Category record is') as HTMLInputElement[];
        return inputs[0]; // first one is CategoryRecordId
    };
    const getCategoryIdInput = () => screen.getByPlaceholderText(/Enter\s+record is/) as HTMLInputElement;
    const getCategoryNameInput = () => screen.getByPlaceholderText('Enter Category Name') as HTMLInputElement;
    const getBasePriceInput = () => {
        const inputs = screen.getAllByPlaceholderText('Enter Category record is') as HTMLInputElement[];
        return inputs[1]; // second one is BasePrice
    };

    const fillForm = (recordId: string, categoryId: string, categoryName: string, basePrice: string) => {
        fireEvent.change(getRecordIdInput(), { target: { value: recordId } });
        fireEvent.change(getCategoryIdInput(), { target: { value: categoryId } });
        fireEvent.change(getCategoryNameInput(), { target: { value: categoryName } });
        fireEvent.change(getBasePriceInput(), { target: { value: basePrice } });
    };

    test('should add a new Category to the table when Save (Add) button is clicked', () => {
        // Fill in the form
        fillForm('1', 'CAT001', 'Electronics', '500');

        // Click the Add button
        fireEvent.click(screen.getByText('Add'));

        // Verify the new record appears in the TableGridContextComponent table
        expect(screen.getByText('CAT001')).toBeInTheDocument();
        expect(screen.getByText('Electronics')).toBeInTheDocument();
        expect(screen.getByText('500')).toBeInTheDocument();

        // Verify table headers are rendered (column names from Category)
        expect(screen.getByText('CategoryRecordId')).toBeInTheDocument();
        expect(screen.getByText('CategoryId')).toBeInTheDocument();
        expect(screen.getByText('CategoryName')).toBeInTheDocument();
        expect(screen.getByText('BasePrice')).toBeInTheDocument();
    });

    test('should add multiple categories and display all in the table', () => {
        // Add first category
        fillForm('1', 'CAT001', 'Electronics', '500');
        fireEvent.click(screen.getByText('Add'));

        // Add second category
        fillForm('2', 'CAT002', 'Clothing', '200');
        fireEvent.click(screen.getByText('Add'));

        // Both records should be in the table
        expect(screen.getByText('CAT001')).toBeInTheDocument();
        expect(screen.getByText('Electronics')).toBeInTheDocument();
        expect(screen.getByText('CAT002')).toBeInTheDocument();
        expect(screen.getByText('Clothing')).toBeInTheDocument();

        // Table should have 2 data rows (+ 1 header row)
        const rows = screen.getAllByRole('row');
        expect(rows.length).toBe(3); // 1 header + 2 data rows
    });

    test('should clear all input fields when Clear button is clicked', () => {
        // Fill in the form
        fillForm('1', 'CAT001', 'Electronics', '500');

        // Verify inputs have values
        expect(getRecordIdInput().value).toBe('1');
        expect(getCategoryIdInput().value).toBe('CAT001');
        expect(getCategoryNameInput().value).toBe('Electronics');
        expect(getBasePriceInput().value).toBe('500');

        // Click the Clear button
        fireEvent.click(screen.getByText('Clear'));

        // Verify all inputs are cleared (reset to default Category values)
        expect(getRecordIdInput().value).toBe('0');
        expect(getCategoryIdInput().value).toBe('');
        expect(getCategoryNameInput().value).toBe('');
        expect(getBasePriceInput().value).toBe('0');
    });

    test('should show "No records" when no categories have been added', () => {
        expect(screen.getByText('No records')).toBeInTheDocument();
    });
});
