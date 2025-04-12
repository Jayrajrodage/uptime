import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ErrorComponent from "@/components/ui/error";
import Loader from "@/components/ui/loader";
import { useChannels } from "@/hooks/useChannels";
import { CreateMonitorInput } from "@/lib/types";
import { CircleCheck } from "lucide-react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";

interface props {
  getValues: UseFormGetValues<CreateMonitorInput>;
  setValue: UseFormSetValue<CreateMonitorInput>;
}

const NotificationChannel = ({ getValues, setValue }: props) => {
  const { data, isLoading, isError, isSuccess } = useChannels();
  const toggleChannel = (id: number) => {
    const current = getValues("notificationChannel") || [];
    const isSelected = current.includes(id);
    const updated = isSelected
      ? current.filter((item) => item !== id)
      : [...current, id];

    setValue("notificationChannel", updated, { shouldValidate: true });
  };
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h4 className="font-medium text-foreground">Notifications</h4>
        <p className="text-muted-foreground text-sm">
          Select the notification channels you want to be informed.
        </p>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <ErrorComponent />
        ) : (
          <>
            {isSuccess && (
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-3 gap-2">
                  {data.map((notifi) => {
                    const selected = (
                      getValues("notificationChannel") || []
                    ).includes(notifi.id);

                    return (
                      <div
                        key={notifi.id}
                        onClick={() => toggleChannel(notifi.id)}
                        className={`border rounded-lg cursor-pointer ${
                          selected ? "border-green-500" : "border-gray-300"
                        }`}
                      >
                        <div className="flex flex-row p-2 items-center justify-between">
                          <div className="flex gap-1">
                            <h1> {notifi.name}</h1>
                            <Badge variant={"secondary"}>
                              {notifi.channel}
                            </Badge>
                          </div>
                          {selected ? (
                            <CircleCheck className="text-green-500" />
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="text-muted-foreground">
                  {data.length === 0 && "Zero channel's found"}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationChannel;
