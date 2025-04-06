import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleCheck } from "lucide-react";
import DashboardLayout from "../layout";

const NotificationDetails = () => {
  return (
    <DashboardLayout>
      <div className="rounded-xl border border-border p-2 bg-background/70 px-3 py-4 backdrop-blur-lg md:col-span-2">
        <div className="flex flex-col gap-7 p-5">
          <div className="grid sm:grid-cols-3 grid-cols-1 gap-5">
            <div className="flex flex-col gap-1 col-span-1">
              <h4 className="font-medium text-foreground">Alert</h4>
              <p className="text-muted-foreground text-sm">
                Update your channel settings
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
                <p className="text-muted-foreground">The email is required.</p>
              </div>
            </div>
          </div>
          <div className="w-full border-t border-gray-300 my-4"></div>
          <div className="flex flex-col gap-1">
            <h4 className="font-medium text-foreground">Monitors</h4>
            <p className="text-muted-foreground text-sm">
              Attach the notification to specific monitors.
            </p>
          </div>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2">
            <div className="border border-gray-300 rounded-lg">
              <div className="flex flex-row p-2 items-center justify-between">
                <div className="flex flex-col gap-1">
                  <h1>Lingo</h1>
                  <p className="text-muted-foreground">
                    https://admin-voice-app
                  </p>
                </div>
                <CircleCheck />
              </div>
            </div>
            <div className="border border-gray-300 rounded-lg">
              <div className="flex flex-row p-2 items-center justify-between">
                <div className="flex flex-col gap-1">
                  <h1>Lingo</h1>
                  <p className="text-muted-foreground">
                    https://admin-voice-app
                  </p>
                </div>
                <CircleCheck />
              </div>
            </div>
            <div className="border border-gray-300 rounded-lg">
              <div className="flex flex-row p-2 items-center justify-between">
                <div className="flex flex-col gap-1">
                  <h1>Lingo</h1>
                  <p className="text-muted-foreground">
                    https://admin-voice-app
                  </p>
                </div>
                <CircleCheck />
              </div>
            </div>
            <div className="border border-gray-300 rounded-lg">
              <div className="flex flex-row p-2 items-center justify-between">
                <div className="flex flex-col gap-1">
                  <h1>Lingo</h1>
                  <p className="text-muted-foreground">
                    https://admin-voice-app
                  </p>
                </div>
                <CircleCheck />
              </div>
            </div>
          </div>
          <div className="flex justify-end py-2">
            <Button className="w-[10rem] h-10">Confirm</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NotificationDetails;
