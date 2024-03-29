"use client";
import * as z from "zod";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileUpload } from "../file-upload";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
export const formSchema = z.object({
  name: z.string().min(1, { message: "Please give your server a name." }),
  imageUrl: z.string().min(1, { message: "Please enter a server image." }),
});

export const CreateServerModal = () => {
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();
  const isModalOpen = isOpen && type === "createServer";
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });
  const loading = form.formState.isSubmitting;
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.post("/api/servers", values);
      form.reset();
      router.refresh();
    } catch (error) {}
    console.log(values);
  }
  const handleClose = () => {
    form.reset();
    onClose();
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black dark:text-white dark:bg-zinc-800   overflow-hidden max-w-sm">
        <DialogHeader className="p-2">
          <DialogTitle className="text-2xl text-center font-bold text-black dark:text-white">
            Create Your First Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500 dark:text-zinc-400 ">
            Give your server a personality with a name and an icon.You can
            always change it later.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex items-center justify-center text-center">
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FileUpload
                        endpoint="serverImage"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-gray-200 text-xs">
                    Server name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Developer's are here"
                      {...field}
                      className="dark:bg-zinc-900  "
                    />
                  </FormControl>
                  <FormDescription className="dark:text-zinc-400">
                    By creating a server, you agree to Discord&apos;s{" "}
                    <Link
                      href="/community"
                      className="text-indigo-400 font-medium"
                    >
                      Community Guidelines
                    </Link>
                  </FormDescription>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="submit"
                disabled={loading}
                variant="primary"
                className="w-full"
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
