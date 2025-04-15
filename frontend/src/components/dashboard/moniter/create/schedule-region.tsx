import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateMonitorInput, frequency } from "@/lib/types";
import { regions } from "@/lib/utils";
import { CircleCheck, CircleX } from "lucide-react";
import {
  UseFormRegister,
  Control,
  Controller,
  FieldErrors,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";

interface props {
  control: Control<CreateMonitorInput, any, CreateMonitorInput>;
  errors: FieldErrors<CreateMonitorInput>;
  setValue?: UseFormSetValue<CreateMonitorInput>;
  getValues?: UseFormGetValues<CreateMonitorInput>;
  register: UseFormRegister<CreateMonitorInput>;
}

const ScheduleRegion = ({
  errors,
  control,
  setValue,
  getValues,
  register,
}: props) => {
  register("subRegions", {
    validate: (value) =>
      (value && value.length > 0) || "At least one region must be selected",
  });
  const toggleRegion = (id: number) => {
    if (!setValue || !getValues) {
      console.log("getValue and setValue are not passed");
      return;
    }
    const current = getValues("subRegions") || [];
    const updated = current.includes(id)
      ? current.filter((i) => i !== id)
      : [...current, id];

    setValue("subRegions", updated, { shouldValidate: true });
  };
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h4 className="font-medium text-foreground">Schedule and Regions</h4>
        <p className="text-muted-foreground text-sm">
          Customize the period of time and the regions where your endpoint will
          be monitored.
        </p>
      </div>
      <div className="space-y-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="Frequency">Frequency</Label>
          <Controller
            name="frequency"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="OneHr">1 hour</SelectItem>
                    <SelectItem value="ThirtyMin">30 minutes</SelectItem>
                    <SelectItem disabled value="TwentyMin">
                      20 minutes (coming soon)
                    </SelectItem>
                    <SelectItem disabled value="TenMin">
                      10 minutes (coming soon)
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <p className="text-muted-foreground text-sm">
          Frequency of how often your endpoint will be pinged.
        </p>
      </div>
      <div className="space-y-2">
        <div className="flex flex-col gap-2">
          <h1 className="font-medium">Region</h1>
          <div className="grid gap-5">
            {errors.subRegions && (
              <p className="text-red-500 text-xs mt-1">
                {errors.subRegions.message}
              </p>
            )}
            {regions.map((region) => (
              <div key={region.name} className="flex flex-col gap-3">
                <h5 className="text-sm">{region.name}</h5>
                <div className="grid grid-cols-3 gap-2">
                  {region.subRegions.map((sub) => {
                    if (!getValues) {
                      console.log("getValue props are not passed");
                      return;
                    }
                    const isSelected = (getValues("subRegions") || []).includes(
                      sub.id
                    );

                    return (
                      <div
                        key={sub.id}
                        onClick={() => toggleRegion(sub.id)}
                        className={`border rounded-lg cursor-pointer ${
                          isSelected ? "border-green-500" : "border-gray-300"
                        }`}
                      >
                        <div className="flex flex-row p-2 items-center justify-between">
                          <div className="flex flex-col gap-1">
                            <h1>{sub.name}</h1>
                          </div>
                          {isSelected ? (
                            <CircleCheck className="text-green-500" />
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm mt-2">
            Select the regions you want to monitor your endpoint from. <br />
            <span className="text-xs">
              Only a few regions are available in the free plan. Upgrade to
              access all regions.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScheduleRegion;
