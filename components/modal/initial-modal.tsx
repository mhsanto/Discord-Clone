"use client";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
export const InitialModal = () => {
  const formSchema = z.object({
    name: z.string().min(1, { message: "Please enter a server name." }),
    imageUrl: z.string().min(1, { message: "Please enter a server image." }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });
const loading = form.formState.isSubmitting;
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Dialog open>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Create your first server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500 ">
            Give your server a name and invite your friends to start chatting.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
