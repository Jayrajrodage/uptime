import { Button } from "@/components/ui/button";
import ErrorComponent from "@/components/ui/error";
import Loader from "@/components/ui/loader";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStatusPages } from "@/hooks/useStatusPages";
import { CreateMonitorInput } from "@/lib/types";
import { Control, Controller } from "react-hook-form";

interface props {
  control: Control<CreateMonitorInput, any, CreateMonitorInput>;
}

const StatusPage = ({ control }: props) => {
  const { data, isLoading, isError, isSuccess } = useStatusPages();
  console.log("🚀 ~ StatusPage ~ data:", data);
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <div>
          <h4 className="font-medium text-foreground">Status Page</h4>
          <p className="text-muted-foreground text-sm">
            Select the pages where you want to display the monitor.
          </p>
        </div>
        <div className="flex flex-col gap-2 col-span-2">
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <ErrorComponent />
          ) : (
            <>
              {isSuccess && (
                <div className="flex flex-col gap-2">
                  <Controller
                    name="StatusPages"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={String(field.value)}
                        onValueChange={(val) => field.onChange(Number(val))}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {data.map((statusPage) => (
                              <SelectItem
                                key={statusPage.id}
                                value={String(statusPage.id)}
                              >
                                {statusPage.title}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <p className="text-muted-foreground">
                    {data.length === 0 && "Zero status page's found"}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusPage;
