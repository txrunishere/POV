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
import { Link, useNavigate } from "react-router";
import {
  loginUserMutation,
  registerUserMutation,
} from "@/lib/react-query/mutations";
import { toast } from "sonner";
import type { AppwriteException } from "appwrite";
import { useAuth } from "@/context/auth-context";

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

  const { checkAuthUser } = useAuth();
  const navigate = useNavigate();

  const { mutateAsync: createNewUser, isPending: userCreateLoading } =
    registerUserMutation();
  const { mutateAsync: loginUser, isPending: userLoginLoading } =
    loginUserMutation();

  const onSubmit = async (data: ISignUpSchema) => {
    try {
      const res = await createNewUser(data);

      if (res) {
        const session = await loginUser({
          email: data.email,
          password: data.password,
        });

        if (session) {
          const isAuthUser = await checkAuthUser();

          if (isAuthUser) {
            navigate("/");
            form.reset();
          }
        } else {
          toast.error("Sign in failed, please try again.");
        }
      } else {
        toast.error("Sign up failed, please try again.");
      }
    } catch (error) {
      const e = error as AppwriteException;
      toast.error(e.message);
    }
  };

  const isLoading = userCreateLoading || userLoginLoading;

  return (
    <Form {...form}>
      <div className="flex flex-col items-center justify-center gap-2 sm:w-[420px]">
        <div className="h-11 w-full sm:h-14">
          <img
            src="./pov-updated.png"
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

          <Button disabled={isLoading} className="w-full" type="submit">
            {isLoading ? (
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
