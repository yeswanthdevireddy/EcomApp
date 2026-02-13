import { useForm, Controller, useFieldArray } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Don't forget the CSS!

const HookForm = ({closeModal}) => {
  const {
    register,
    control,
    formState: { errors, isSubmitting },
    watch,
    handleSubmit,
    setError,
  } = useForm({
    defaultValues: {
      firstName: "",
      email: "",
      age: 0,
      gender: "",
      address: { city: "", state: "" },
      startDate: new Date(),
      hobbies: [],
      subscribe: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "hobbies",
  });

  const city = watch("address.city");
  const isSubscribed = watch("subscribe");

  const onSubmit = async (data) => {
    try {
      console.log("Form Data:", data);
     
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if(closeModal)
      {
        closeModal();
      }
    } catch (error) {
      setError("root", { message: "Server error occurred" });
    }
  };

  return (
    <>
      {/* 2. Pass your function to handleSubmit */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("firstName", { required: "Name is Required" })}
          placeholder="Enter Name"
        />
        <p>{errors.firstName?.message}</p>

        <input
          {...register("email", {
            required: "Email is Required",
            pattern: { value: /^\S+@\S+$/, message: "Invalid email entered" },
          })}
          placeholder="Enter Email"
        />
        <p>{errors.email?.message}</p>

        <input
          type="number"
          {...register("age", {
            required: "Age is Required",
            min: { value: 18, message: "Minimum age is 18" },
          })}
          placeholder="Enter Age"
        />
        <p>{errors.age?.message}</p>

        <select {...register("gender", { required: "Gender is Required" })}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <p>{errors.gender?.message}</p>

        <div>
          <input
            {...register("address.city", { required: "City is Required" })}
            placeholder="City"
          />
          
          <p>{errors.address?.city?.message}</p>

          {city && (
            <input
              {...register("address.state", { required: "State is Required" })}
              placeholder="State"
            />
          )}
          <p>{errors.address?.state?.message}</p>
        </div>

        <div>
          <Controller
            control={control}
            name="startDate"
            render={({ field }) => (
              <DatePicker
                placeholderText="Select date"
                onChange={(date) => field.onChange(date)}
                selected={field.value}
              />
            )}
          />
        </div>

        <div>
         
          <label>Hobbies</label>
          {fields.map((field, index) => (
            <div key={field.id}>
              <input
                {...register(`hobbies.${index}.name`, { required: "Hobby is Required" })}
                placeholder="Enter Hobby"
              />
           
              <p>{errors.hobbies?.[index]?.name?.message}</p>

              {fields.length > 0 && (
                <button type="button" onClick={() => remove(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}
         
          <button type="button" onClick={() => append({ name: "" })}>
            Add Hobby
          </button>
        </div>

        <div>
          <label>
            Subscribe
            <input type="checkbox" {...register("subscribe")} />
          </label>

          {isSubscribed && (
            <input
              {...register("referral", { required: "Referral is required" })}
              placeholder="Referral Source"
            />
          )}
          <p>{errors.referral?.message}</p>
        </div>

        {errors.root && <p style={{ color: "red" }}>{errors.root.message}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Loading..." : "Submit"}
        </button>
      </form>
    </>
  );
};

export default HookForm;