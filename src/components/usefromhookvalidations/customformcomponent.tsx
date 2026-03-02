import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// 1. Define schema with proper date handling
const customerFormSchema = z
  .object({
    customerName: z.string().nonempty("Customer name is required"),
    address: z.string().nonempty("Address is required"),

    email: z
      .string()
      .email("Invalid email format")
      .refine(
        async (value) => {
          try {
            if (!value.endsWith(".com")) return false;

            const res = await fetch(
              `https://localhost:7250/api/check-email?email=${value}`
            );
            if (!res.ok) return false;

            const data = await res.json();
            return data.IsAvailable === true;
          } catch {
            return false;
          }
        },
        { message: "Email is not available" }
      ),

    // Convert string → Date
    dateOfBirth: z
      .string()
      .nonempty("Date of birth is required")
      .transform((val) => new Date(val)),

    registrationDate: z
      .string()
      .nonempty("Registration date is required")
      .transform((val) => new Date(val)),

    age: z.number().min(18, "Age must be at least 18"),
  })
  .refine(
    (data) => data.registrationDate > data.dateOfBirth,
    {
      message: "Registration date must be after date of birth",
      path: ["registrationDate"],
    }
  );

// 2. Infer schema type
type CustomerDataFormModel = z.infer<typeof customerFormSchema>;

const CustomerFormComponent = () => {
  // 3. Bind schema to form
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CustomerDataFormModel>({
    resolver: zodResolver(customerFormSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      customerName: "",
      address: "",
      email: "",
      age: 0,
    },
  });

  const onSubmit = (data: CustomerDataFormModel) =>
    console.log(`Form submitted: ${JSON.stringify(data)}`);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Customer Name:</label>
          <input type="text" {...register("customerName")} />
          {errors.customerName && (
            <p style={{ color: "red" }}>{errors.customerName.message}</p>
          )}
        </div>

        <div>
          <label>Address:</label>
          <input type="text" {...register("address")} />
          {errors.address && (
            <p style={{ color: "red" }}>{errors.address.message}</p>
          )}
        </div>

        <div>
          <label>Email:</label>
          <input type="email" {...register("email")} />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>

        <div>
          <label>Date of Birth:</label>
          <input type="date" {...register("dateOfBirth")} />
          {errors.dateOfBirth && (
            <p style={{ color: "red" }}>{errors.dateOfBirth.message}</p>
          )}
        </div>

        <div>
          <label>Registration Date:</label>
          <input type="date" {...register("registrationDate")} />
          {errors.registrationDate && (
            <p style={{ color: "red" }}>{errors.registrationDate.message}</p>
          )}
        </div>

        <div>
          <label>Age:</label>
          <input type="number" {...register("age", { valueAsNumber: true })} />
          {errors.age && (
            <p style={{ color: "red" }}>{errors.age.message}</p>
          )}
        </div>

        <div>
          <button type="submit" disabled={!isValid}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerFormComponent;
