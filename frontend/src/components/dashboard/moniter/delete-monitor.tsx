import { Button } from "@/components/ui/button";
import { useDeleteMonitor } from "@/hooks/useDeleteMonitor";
import { onDeleteMonitor } from "@/lib/utils";
import { toast } from "sonner";

interface props {
  id?: string;
}
const DeleteMonitor = ({ id }: props) => {
  const deleteMutation = useDeleteMonitor();
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
            onClick={() => onDeleteMonitor(id, deleteMutation)}
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
