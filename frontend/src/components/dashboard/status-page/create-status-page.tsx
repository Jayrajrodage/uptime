import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InputCreateStatusPage } from "@/lib/types";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMonitorNames } from "@/api/monitor";
import Loader from "@/components/ui/loader";
import ErrorComponent from "@/components/ui/error";
import { toast } from "sonner";
import { crateStatusPage } from "@/api/status-pages";

const CreateStatusPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<InputCreateStatusPage>({ mode: "onChange" });
  const queryClient = useQueryClient();

  const title = watch("title");

  useEffect(() => {
    if (title) {
      const slug = title.toLowerCase().replace(/\s+/g, "-");
      setValue("slug", slug);
    }
  }, [title, setValue]);

  const { data, isLoading, isSuccess, isError } = useQuery<
    {
      name: string;
      id: number;
    }[]
  >({
    queryKey: ["monitorNames"],
    queryFn: getMonitorNames,
  });

  const mutation = useMutation({
    mutationFn: async (data: InputCreateStatusPage) => crateStatusPage(data),
  });
  const onSubmit = (data: InputCreateStatusPage) => {
    toast.promise(mutation.mutateAsync(data), {
      loading: "Creating status page...",
      success: async () => {
        reset();
        await queryClient.invalidateQueries({ queryKey: ["statusPages"] });
        return "Status page crated successfully!";
      },
      error: (error: any) => {
        const responseErrors = error?.response?.data?.message;
        if (Array.isArray(responseErrors)) {
          return responseErrors.join(", ");
        }
        return responseErrors || "Something went wrong";
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7 p-5">
      <div className="grid sm:grid-cols-3 grid-cols-1 gap-5">
        <div className="flex flex-col gap-1 col-span-1">
          <h4 className="font-medium text-foreground">Basic information</h4>
          <p className="text-muted-foreground text-sm">
            The public status page to update your users on service uptime.
          </p>
        </div>
        <div className="flex flex-col gap-3 col-span-2">
          <div className="flex flex-col gap-2 col-span-5">
            <Label htmlFor="Title">Title</Label>
            <Input
              type="text"
              id="Title"
              placeholder="Title"
              {...register("title", {
                required: "Title is required",
                maxLength: {
                  value: 30,
                  message: "Title must be less than 30 characters",
                },
                pattern: {
                  value: /^[^.]+$/, // disallows dot
                  message: "dot (.) is not allowed",
                },
              })}
            />
            <p className="text-muted-foreground">The title of your page.</p>
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2 col-span-5">
            <Label htmlFor="Slug">Slug</Label>
            <div className="flex">
              <Input
                type="text"
                id="Slug"
                placeholder="Slug"
                readOnly
                {...register("slug")}
              />
              <div className="dark:bg-gray-500 bg-gray-400 w-[10rem] flex justify-center items-center rounded-tr-lg rounded-ee-lg">
                .uptimely.top
              </div>
            </div>
            <p className="text-muted-foreground">
              The subdomain for your status page. At least 3 chars.
            </p>
          </div>

          <div className="flex flex-col gap-2 col-span-2">
            <Label htmlFor="monitorId">Select monitor</Label>
            {isLoading ? (
              <Loader />
            ) : isError ? (
              <ErrorComponent />
            ) : (
              <>
                {isSuccess && (
                  <Select
                    onValueChange={(value) =>
                      setValue("monitorId", Number(value))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select monitor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {data.map((monitor) => (
                          <SelectItem
                            key={monitor.id}
                            value={monitor.id.toString()}
                          >
                            {monitor.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              </>
            )}

            {errors.monitorId && (
              <p className="text-red-500 text-sm">Monitor is required</p>
            )}
          </div>

          <div className="flex justify-end py-2">
            <Button
              type="submit"
              className="w-[10rem] h-10"
              disabled={!isValid || mutation.isPending}
            >
              {mutation.isPending ? "Submitting..." : "Confirm"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateStatusPage;
