import { Channel } from "@/lib/utils";
import { type MRT_Row } from "material-react-table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteChannel } from "@/api/channel";
import { useQueryClient } from "@tanstack/react-query";
interface props {
  row: MRT_Row<Channel>;
}
const DeleteChannel = ({ row }: props) => {
  const mutation = useMutation({
    mutationFn: () => deleteChannel(row.original.id),
  });
  const queryClient = useQueryClient();
  const onDelete = () => {
    toast.promise(mutation.mutateAsync(), {
      loading: "Deleting channel...",
      success: async () => {
        await queryClient.invalidateQueries({ queryKey: ["channels"] });
        return "Channel deleted successfully!";
      },
      error: (error: any) => {
        const responseErrors = error?.response?.data?.message;
        return responseErrors || "Something went wrong";
      },
    });
  };
  return (
    <div className="flex gap-2">
      <Link to={`/dashboard/notifications/channel/details/${row.original.id}`}>
        <Button variant="outline" size="xs">
          Edit
        </Button>
      </Link>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size={"xs"} variant="destructive">
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              channel.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteChannel;
