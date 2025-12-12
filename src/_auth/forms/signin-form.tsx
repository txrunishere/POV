import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignInFormSchema, type ISignInSchema } from "@/lib/validation";
import { Loader } from "@/components/common";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { loginUserMutation } from "@/lib/react-query/mutations";
import type { AppwriteException } from "appwrite";
import { useAuth } from "@/context/auth-context";

const SigninForm = () => {
  const form = useForm<ISignInSchema>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { checkAuthUser } = useAuth();

  const navigate = useNavigate();

  const { mutateAsync: loginUser, isPending: userLoginLoading } =
    loginUserMutation();

  const onSubmit = async (data: ISignInSchema) => {
    try {
      const session = await loginUser(data);

      if (session) {
        const currentUser = await checkAuthUser();

        if (currentUser) {
          navigate("/");
          form.reset();
        }
      } else {
        toast.error("Failed to sign in! please try again!");
      }
    } catch (error) {
      const e = error as AppwriteException;
      toast.error(e.message);
    }
  };

  const isLoading = userLoginLoading;

  return (
    <Form {...form}>
      <div className="flex flex-col items-center justify-center gap-2 sm:w-[420px]">
        <div className="h-8 w-[70%] sm:h-14">
          <img
            src="./pov-updated.png"
            className="h-full w-full object-cover object-center"
            alt=""
          />
        </div>
        <h2 className="text-lg font-semibold md:text-2xl">
          Log in to your account
        </h2>
        <p className="text-muted-foreground text-sm">
          Welcome back! Please enter your details
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-4 w-full space-y-6"
        >
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
          <Link className="text-stone-400" to={"/sign-up"}>
            Sign Up
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default SigninForm;
