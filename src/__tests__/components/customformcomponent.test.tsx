import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomerFormComponent from '../../components/usefromhookvalidations/customformcomponent';

describe.skip('CustomerFormComponent', () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    (global.fetch as jest.Mock).mockReset();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Form Rendering', () => {
    it('should render all form fields', () => {
      render(<CustomerFormComponent />);

      expect(screen.getByLabelText(/Customer Name:/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Address:/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Date of Birth:/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Registration Date:/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Age:/i)).toBeInTheDocument();
    });

    it('should render submit button', () => {
      render(<CustomerFormComponent />);

      const submitButton = screen.getByRole('button', { name: /Save/i });
      expect(submitButton).toBeInTheDocument();
    });

    it('should have submit button disabled initially', () => {
      render(<CustomerFormComponent />);

      const submitButton = screen.getByRole('button', { name: /Save/i });
      expect(submitButton).toBeDisabled();
    });
  });

  describe('Form Validation - Required Fields', () => {
    it('should show error when customer name is empty and field loses focus', async () => {
      const user = userEvent.setup();
      render(<CustomerFormComponent />);

      const nameInput = screen.getByLabelText(/Customer Name:/i);
      await user.click(nameInput);
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText(/Customer name is required/i)).toBeInTheDocument();
      });
    });

    it('should show error when address is empty and field loses focus', async () => {
      const user = userEvent.setup();
      render(<CustomerFormComponent />);

      const addressInput = screen.getByLabelText(/Address:/i);
      await user.click(addressInput);
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText(/Address is required/i)).toBeInTheDocument();
      });
    });

    it('should show error when date of birth is empty and field loses focus', async () => {
      const user = userEvent.setup();
      render(<CustomerFormComponent />);

      const dobInput = screen.getByLabelText(/Date of Birth:/i);
      await user.click(dobInput);
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText(/Date of birth is required/i)).toBeInTheDocument();
      });
    });
  });

  describe('Form Validation - Email', () => {
    it('should show error for invalid email format', async () => {
      const user = userEvent.setup();
      render(<CustomerFormComponent />);

      const emailInput = screen.getByLabelText(/Email:/i);
      await user.type(emailInput, 'invalidemail');
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText(/Invalid email format/i)).toBeInTheDocument();
      });
    });

    it('should validate email with .com extension', async () => {
      const user = userEvent.setup();
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ IsAvailable: true }),
      });

      render(<CustomerFormComponent />);

      const emailInput = screen.getByLabelText(/Email:/i);
      await user.type(emailInput, 'test@example.org');
      await user.tab();

      await waitFor(() => {
        expect(screen.queryByText(/Invalid email format/i)).not.toBeInTheDocument();
      });
    });

    it('should call API to check email availability', async () => {
      const user = userEvent.setup();
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ IsAvailable: true }),
      });

      render(<CustomerFormComponent />);

      const emailInput = screen.getByLabelText(/Email:/i);
      await user.type(emailInput, 'test@example.com');
      await user.tab();

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          expect.stringContaining('email=test@example.com')
        );
      });
    });

    it('should show error when email is not available', async () => {
      const user = userEvent.setup();
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ IsAvailable: false }),
      });

      render(<CustomerFormComponent />);

      const emailInput = screen.getByLabelText(/Email:/i);
      await user.type(emailInput, 'taken@example.com');
      await user.tab();

      await waitFor(
        () => {
          expect(screen.getByText(/Email is not available/i)).toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    });
  });

  describe('Form Validation - Age', () => {
    it('should show error when age is less than 18', async () => {
      const user = userEvent.setup();
      render(<CustomerFormComponent />);

      const ageInput = screen.getByLabelText(/Age:/i);
      await user.clear(ageInput);
      await user.type(ageInput, '15');
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText(/Age must be at least 18/i)).toBeInTheDocument();
      });
    });

    it('should not show error when age is 18 or more', async () => {
      const user = userEvent.setup();
      render(<CustomerFormComponent />);

      const ageInput = screen.getByLabelText(/Age:/i);
      await user.clear(ageInput);
      await user.type(ageInput, '25');
      await user.tab();

      await waitFor(() => {
        expect(screen.queryByText(/Age must be at least 18/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('Form Validation - Date Comparison', () => {
    it('should show error when registration date is before date of birth', async () => {
      const user = userEvent.setup();
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({ IsAvailable: true }),
      });

      render(<CustomerFormComponent />);

      const dobInput = screen.getByLabelText(/Date of Birth:/i);
      const regInput = screen.getByLabelText(/Registration Date:/i);

      await user.type(dobInput, '2000-01-01');
      await user.type(regInput, '1999-01-01');
      await user.tab();

      await waitFor(() => {
        expect(
          screen.getByText(/Registration date must be after date of birth/i)
        ).toBeInTheDocument();
      });
    });

    it('should not show error when registration date is after date of birth', async () => {
      const user = userEvent.setup();
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({ IsAvailable: true }),
      });

      render(<CustomerFormComponent />);

      const dobInput = screen.getByLabelText(/Date of Birth:/i);
      const regInput = screen.getByLabelText(/Registration Date:/i);

      await user.type(dobInput, '2000-01-01');
      await user.type(regInput, '2020-01-01');
      await user.tab();

      await waitFor(() => {
        expect(
          screen.queryByText(/Registration date must be after date of birth/i)
        ).not.toBeInTheDocument();
      });
    });
  });

  describe('Form Submission', () => {
    it('should submit form with valid data', async () => {
      const user = userEvent.setup();
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({ IsAvailable: true }),
      });

      render(<CustomerFormComponent />);

      await user.type(screen.getByLabelText(/Customer Name:/i), 'John Doe');
      await user.type(screen.getByLabelText(/Address:/i), '123 Main St');
      await user.type(screen.getByLabelText(/Email:/i), 'john@example.com');
      await user.type(screen.getByLabelText(/Date of Birth:/i), '1990-01-01');
      await user.type(screen.getByLabelText(/Registration Date:/i), '2020-01-01');
      await user.clear(screen.getByLabelText(/Age:/i));
      await user.type(screen.getByLabelText(/Age:/i), '30');

      // Wait for email validation to complete
      await waitFor(
        () => {
          const submitButton = screen.getByRole('button', { name: /Save/i });
          expect(submitButton).not.toBeDisabled();
        },
        { timeout: 3000 }
      );

      const submitButton = screen.getByRole('button', { name: /Save/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(consoleLogSpy).toHaveBeenCalledWith(
          expect.stringContaining('Form submitted:')
        );
      });

      consoleLogSpy.mockRestore();
    });

    it('should not submit form with invalid data', async () => {
      const user = userEvent.setup();
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

      render(<CustomerFormComponent />);

      const submitButton = screen.getByRole('button', { name: /Save/i });
      expect(submitButton).toBeDisabled();

      await user.type(screen.getByLabelText(/Customer Name:/i), 'John Doe');
      await user.tab();

      // Button should still be disabled
      expect(submitButton).toBeDisabled();
      expect(consoleLogSpy).not.toHaveBeenCalled();

      consoleLogSpy.mockRestore();
    });
  });

  describe('Form Integration', () => {
    it('should handle complete form flow', async () => {
      const user = userEvent.setup();

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({ IsAvailable: true }),
      });

      render(<CustomerFormComponent />);

      // Fill all fields
      await user.type(screen.getByLabelText(/Customer Name:/i), 'Jane Smith');
      await user.type(screen.getByLabelText(/Address:/i), '456 Oak Avenue');
      await user.type(screen.getByLabelText(/Email:/i), 'jane@example.com');
      await user.type(screen.getByLabelText(/Date of Birth:/i), '1995-06-15');
      await user.type(screen.getByLabelText(/Registration Date:/i), '2025-01-01');
      await user.clear(screen.getByLabelText(/Age:/i));
      await user.type(screen.getByLabelText(/Age:/i), '28');

      // Verify all values are entered
      expect(screen.getByLabelText(/Customer Name:/i)).toHaveValue('Jane Smith');
      expect(screen.getByLabelText(/Address:/i)).toHaveValue('456 Oak Avenue');
      expect(screen.getByLabelText(/Email:/i)).toHaveValue('jane@example.com');
      expect(screen.getByLabelText(/Age:/i)).toHaveValue(28);
    });
  });
});
