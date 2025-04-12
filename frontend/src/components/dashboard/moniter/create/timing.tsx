import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateMonitorInput } from "@/lib/types";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface props {
  register: UseFormRegister<CreateMonitorInput>;
  errors: FieldErrors<CreateMonitorInput>;
}

const Timing = ({ register, errors }: props) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h4 className="font-medium text-foreground">Timing Setting</h4>
        <p className="text-muted-foreground text-sm">
          Add specific time limits to your requests to receive notifications if
          an endpoint takes longer than expected.
        </p>
      </div>
      <div className="mt-2 grid gap-4">
        <div className="flex flex-col gap-2">
          <Label>Degraded (in ms.)</Label>
          <Input disabled type="number" placeholder="coming soon" />
          <p className="text-muted-foreground text-sm">
            Time after which the endpoint is considered degraded.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Timeout (in ms.)</Label>
          <Input
            type="number"
            placeholder="30000"
            {...register("timeout", {
              max: {
                value: 10000000,
                message: "timeout must be less than 10000000 characters",
              },
            })}
          />
          <p className="text-muted-foreground text-sm">
            Max. time allowed for request to complete.
          </p>
          {errors.timeout && (
            <p className="text-red-500 text-xs mt-1">
              {errors.timeout?.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Timing;
