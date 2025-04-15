import { deleteMonitor } from "@/api/monitor";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface props {
  id?: string;
}
const DeleteMonitor = ({ id }: props) => {
  const deleteMutation = useMutation({
    mutationFn: () => deleteMonitor(id),
  });
  const onDelete = () => {
    toast.promise(deleteMutation.mutateAsync(), {
      loading: "Deleting monitor...",
      success: async () => {
        return "Monitor deleted successfully!";
      },
      error: (error: any) => {
        const responseErrors = error?.response?.data?.message;
        return responseErrors || "Something went wrong";
      },
    });
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <div>
          <h4 className="font-medium text-foreground">Danger Zone</h4>
          <p className="text-muted-foreground text-sm">
            Be aware of the changes you are about to make.
          </p>
        </div>
        <div className="flex items-center justify-start gap-5 mt-5">
          <Button
            type="button"
            onClick={onDelete}
            disabled={deleteMutation.isPending}
            className="bg-red-500 hover:bg-red-400"
          >
            Delete
          </Button>
          <p className="text-red-500">
            This action cannot be undone. This will permanently delete the
            monitor.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeleteMonitor;
