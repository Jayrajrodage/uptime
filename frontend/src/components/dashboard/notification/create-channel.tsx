import { Button } from "@/components/ui/button";
import Typography from "@mui/material/Typography";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { crateChannel } from "@/api/channel";
import { toast } from "sonner";
import { CreateChannelInput } from "@/lib/types";
const Channels = ["Email", "SMS", "Discord", "Slack"];
const ComingSoon = ["Discord", "Slack"];
const CreateChannel = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<CreateChannelInput>({ mode: "onChange" });

  const mutation = useMutation({
    mutationFn: (data: CreateChannelInput) => crateChannel(data),
    onSuccess: () => {
      toast.success("Channel created!");
      reset();
    },
    onError: (error: any) => {
      const responseErrors = error?.response?.data?.message;
      if (Array.isArray(responseErrors)) {
        responseErrors.forEach((err: string) => toast.error(err));
      } else {
        toast.error(responseErrors);
      }
    },
  });

  const onSubmit = (data: CreateChannelInput) => {
    mutation.mutate(data);
  };
  return (
    <div className="rounded-xl border border-border bg-background/70 px-3 py-4 backdrop-blur-lg">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between py-1">
          <div>
            <Typography variant="h4">Channels</Typography>
            <Typography variant="body1">Connect all your channels</Typography>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {Channels.map((channel) => (
            <div
              key={channel}
              className="flex items-center justify-between border-2 rounded-xl p-2 px-3"
            >
              <div className="flex flex-col gap-1">
                <div className="text-lg">{channel}</div>
                <p className="text-muted-foreground">
                  send notifications with {channel}
                </p>
              </div>
              <Drawer onClose={() => reset()} key={channel}>
                <DrawerTrigger>
                  <Button
                    disabled={ComingSoon.includes(channel)}
                    variant={"default"}
                  >
                    {ComingSoon.includes(channel) ? "Coming Soon" : "Create"}
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-7 p-5"
                  >
                    <div className="grid sm:grid-cols-3 grid-cols-1 gap-5">
                      <div className="flex flex-col gap-1 col-span-1">
                        <h4 className="font-medium text-foreground">Create</h4>
                        <p className="text-muted-foreground text-sm">
                          Create your channel.
                        </p>
                      </div>
                      <div className="flex flex-col gap-3 col-span-2">
                        <div className="flex flex-col gap-2 col-span-5">
                          <Label htmlFor="Name">Name</Label>
                          <Input
                            type="text"
                            id="Name"
                            placeholder="Name"
                            {...register("name", {
                              required: "Name is required",
                              maxLength: {
                                value: 30,
                                message: "Name must be less than 30 characters",
                              },
                            })}
                          />
                          <p className="text-muted-foreground">
                            Define a name for the channel.
                          </p>
                          {errors.name && (
                            <p className="text-red-500 text-sm">
                              {errors.name.message}
                            </p>
                          )}
                        </div>
                        {channel === "Email" ? (
                          <div className="flex flex-col gap-2 col-span-5">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              type="email"
                              id="email"
                              placeholder="Email"
                              {...register("channeldata", {
                                required: "Email is required",
                                pattern: {
                                  value: /^\S+@\S+$/i,
                                  message: "Invalid email format",
                                },
                              })}
                            />
                            <p className="text-muted-foreground">
                              The email is required.
                            </p>
                            {errors.channeldata && (
                              <p className="text-red-500 text-sm">
                                {errors.channeldata.message}
                              </p>
                            )}
                          </div>
                        ) : channel === "SMS" ? (
                          <div className="flex flex-col gap-2 col-span-5">
                            <Label htmlFor="number">Phone number</Label>
                            <Input
                              type="text"
                              id="number"
                              placeholder="+919585959585"
                              {...register("channeldata", {
                                required: "Phone number is required",
                                pattern: {
                                  value: /^(?:\+91[-\s]?)?[6-9]\d{9}$/,
                                  message: "Invalid Indian mobile number",
                                },
                              })}
                            />
                            <p className="text-muted-foreground">
                              The Phone number is required.
                            </p>
                            {errors.channeldata && (
                              <p className="text-red-500 text-sm">
                                {errors.channeldata.message}
                              </p>
                            )}
                          </div>
                        ) : (
                          <></>
                        )}
                        <div className="flex justify-end py-2">
                          <Button
                            type="submit"
                            disabled={mutation.isPending || !isValid}
                            className="w-[10rem] h-10"
                          >
                            {mutation.isPending ? "Creating..." : "Confirm"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </form>
                </DrawerContent>
              </Drawer>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateChannel;
