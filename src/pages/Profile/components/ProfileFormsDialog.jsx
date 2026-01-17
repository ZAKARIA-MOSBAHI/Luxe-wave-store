import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";

export default function ProfileFormsDialog({
  dialogTitle,
  dialogDescription,
  dialogOpen,
  setDialogOpen,
  children,
}) {
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {/* <DialogTrigger asChild>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
