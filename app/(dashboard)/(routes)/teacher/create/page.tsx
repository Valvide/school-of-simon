"use client";
// Import functionality  Modules
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
// import UI components
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
import Link from "next/link";
import toast from "react-hot-toast";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required.",
  }),
});

const CreatePage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      //step 1: send the validated value(using zod and the useform from the inputs
      const response = await axios.post("/api/courses", values);
      // step 2: Store the response
      router.push(`/teacher/courses/${response.data.id}`);
      // step 3: Let the user know it went well successful with toast.
      toast.success("Course Created ");
    } catch (error) {
      toast.error("Something went wrong");
    }
    console.log(values);
  };
  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center p-6 h-full">
      <div>
        <h1 className=" text-2xl">Name your course</h1>
        <p className="text-sm text-slate-600">
          What would you like to name your course? Don&apos;t worry,you can
          change this later
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. 'Advanced web development'"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What will you teach in this course?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2  ">
              <Link href="/">
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={isSubmitting || !isValid}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
      {/*  Form Component from shadcn ui */}
    </div>
  );
};

export default CreatePage;
