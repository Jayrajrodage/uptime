import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@clerk/clerk-react";

const UserProfile = () => {
  const { user } = useUser();
  return (
    <div className="flex flex-col gap-7 p-5">
      <div className="flex flex-col gap-1">
        <h4 className="font-medium text-foreground">User</h4>
        <p className="text-muted-foreground text-sm">
          Profile settings for the user.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 col-span-5">
          <Label htmlFor="FullName">Full name</Label>
          <Input
            disabled
            type="text"
            id="FullName"
            placeholder="Full Name"
            defaultValue={user?.fullName || ""}
          />
        </div>
        <div className="flex flex-col gap-2 col-span-5">
          <Label htmlFor="Email">Email</Label>
          <Input
            disabled
            type="Email"
            id="Email"
            placeholder="Email"
            defaultValue={user?.emailAddresses[0].emailAddress || ""}
          />
        </div>
      </div>
      <div className="flex justify-end py-2">
        <Button className="w-[10rem] h-10">Confirm</Button>
      </div>
    </div>
  );
};

export default UserProfile;
