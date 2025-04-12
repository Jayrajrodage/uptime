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
import { CreateMonitorInput } from "@/lib/types";
import {
  Control,
  Controller,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
} from "react-hook-form";

interface props {
  register: UseFormRegister<CreateMonitorInput>;
  control: Control<CreateMonitorInput, any, CreateMonitorInput>;
  errors: FieldErrors<CreateMonitorInput>;
}

const Request = ({ register, control, errors }: props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "headers",
  });
  return (
    <div className="flex flex-col gap-5">
      <div>
        <div className="flex flex-col gap-1">
          <h4 className="font-medium text-foreground">Request Settings</h4>
          <p className="text-muted-foreground text-sm">
            Update your <span className="underline">HTTP</span> request. Add
            custom headers, payload and test your endpoint before submitting.
          </p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-7 grid-cols-1">
        <div className="flex flex-col gap-2 col-span-2">
          <Label htmlFor="method">Method</Label>
          <Controller
            name="method"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                defaultValue={"GET"}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem disabled value="POST">
                      POST (Coming Soon)
                    </SelectItem>
                    <SelectItem disabled value="PUT">
                      PUT (Coming Soon)
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="flex flex-col gap-2 col-span-5">
          <Label htmlFor="url">URL</Label>
          <Input
            type="text"
            id="url"
            placeholder="URL"
            {...register("url", {
              required: "URL is required",
              pattern: {
                value:
                  /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=.]+)?$/,
                message: "Enter a valid URL",
              },
            })}
          />
          {errors.url && (
            <span className="text-red-500 text-sm">{errors.url.message}</span>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Label>Request Header</Label>
        {fields.map((header, index) => (
          <div key={index} className="flex gap-2">
            <div className="flex flex-col gap-2 flex-1">
              <Label>key</Label>
              <Input
                type="text"
                placeholder="key"
                key={header.id}
                {...register(`headers.${index}.key` as const, {
                  required: "Header key is required",
                })}
              />
              {errors.headers?.[index]?.key && (
                <p className="text-sm text-red-500">
                  {errors.headers[index]?.key?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <Label>value</Label>
              <Input
                type="text"
                placeholder="value"
                key={header.id}
                {...register(`headers.${index}.value` as const, {
                  required: "header value is required",
                })}
              />
              {errors.headers?.[index]?.value && (
                <p className="text-sm text-red-500">
                  {errors.headers[index]?.value?.message}
                </p>
              )}
            </div>

            {fields.length > 0 && (
              <div className="flex flex-col gap-2">
                <Label>Remove</Label>
                <Button variant="destructive" onClick={() => remove(index)}>
                  -
                </Button>
              </div>
            )}
          </div>
        ))}

        <Button
          variant="outline"
          onClick={() => append({ key: "", value: "" })}
        >
          + Add Custom Header
        </Button>
      </div>
    </div>
  );
};

export default Request;
