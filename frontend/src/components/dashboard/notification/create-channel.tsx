import { Button } from "@/components/ui/button";
import Typography from "@mui/material/Typography";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
const Channels = ["Email", "SMS", "Discord", "Slack"];

const CreateChannel = () => {
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
              <Drawer>
                <DrawerTrigger>
                  <Button variant={"default"}>Create</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="flex flex-col gap-7 p-5">
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
                          <Input type="text" id="Name" placeholder="Name" />
                          <p className="text-muted-foreground">
                            Define a name for the channel.
                          </p>
                        </div>
                        <div className="flex flex-col gap-2 col-span-5">
                          <Label htmlFor="Email">Email</Label>
                          <Input type="Email" id="Email" placeholder="Email" />
                          <p className="text-muted-foreground">
                            The email is required.
                          </p>
                        </div>
                        <div className="flex justify-end py-2">
                          <Button className="w-[10rem] h-10">Confirm</Button>
                        </div>
                      </div>
                    </div>
                  </div>
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
