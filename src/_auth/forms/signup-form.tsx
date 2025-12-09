import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignUpFormSchema, type ISignUpSchema } from "@/lib/validation";
import { Loader } from "@/components/common";
import { Link } from "react-router";
import { createUser } from "@/lib/appwrite/api";

const SignupForm = () => {
  const form = useForm<ISignUpSchema>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      username: "",
      email: "",
      name: "",
      password: "",
    },
  });

  const onSubmit = async (data: ISignUpSchema) => {
    const res = await createUser(data);
    console.log(res);
    form.reset();
  };

  return (
    <Form {...form}>
      <div className="flex flex-col items-center justify-center gap-2 sm:w-[420px]">
        <div className="h-8 w-[40%] sm:h-14">
          <img
            src="./pov-logo.png"
            className="h-full w-full object-cover object-center"
            alt=""
          />
        </div>
        <h2 className="text-lg font-semibold md:text-2xl">
          Create New Account
        </h2>
        <p className="text-muted-foreground text-sm">
          To use POV, please enter your details
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-4 w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={form.formState.isSubmitting}
            className="w-full"
            type="submit"
          >
            {form.formState.isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader /> Loading...
              </span>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
        <p>
          Already have a account?{" "}
          <Link className="text-stone-400" to={"/sign-in"}>
            Sign In
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default SignupForm;
