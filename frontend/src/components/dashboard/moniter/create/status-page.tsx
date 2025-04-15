import { Badge } from "@/components/ui/badge";
import ErrorComponent from "@/components/ui/error";
import Loader from "@/components/ui/loader";
import { useStatusPages } from "@/hooks/useStatusPages";
import { CreateMonitorInput } from "@/lib/types";
import { CircleCheck, CircleX } from "lucide-react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";

interface props {
  getValues: UseFormGetValues<CreateMonitorInput>;
  setValue: UseFormSetValue<CreateMonitorInput>;
}

const StatusPage = ({ getValues, setValue }: props) => {
  const { data, isLoading, isError, isSuccess } = useStatusPages();
  const togglePage = (id: number | null, selected: boolean) => {
    if (selected) {
      setValue("StatusPages", null, { shouldValidate: true });
    } else {
      setValue("StatusPages", id, { shouldValidate: true });
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h4 className="font-medium text-foreground">Status Page</h4>
        <p className="text-muted-foreground text-sm">
          Customize the informations about your monitor on the corresponding
          status page.
        </p>
      </div>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ErrorComponent />
      ) : (
        <>
          {isSuccess && (
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-3 gap-2">
                {data.map((page) => {
                  const selected = getValues("StatusPages") === page.id;

                  return (
                    <div
                      key={page.id}
                      onClick={() => togglePage(page.id, selected)}
                      className={`border rounded-lg cursor-pointer ${
                        selected ? "border-green-500" : "border-gray-300"
                      }`}
                    >
                      <div className="flex flex-row p-2 items-center justify-between">
                        <div className="flex flex-col items-start gap-1">
                          <h6>{page.title}</h6>
                          <Badge
                            className="hidden sm:block"
                            variant={"secondary"}
                          >
                            {page.slug}
                          </Badge>
                        </div>

                        {selected ? (
                          <CircleCheck className="text-green-500" />
                        ) : (
                          <CircleX className="text-gray-400" />
                        )}
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
  );
};

export default StatusPage;
