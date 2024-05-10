import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogTitle
} from "~/components/ui/dialog";
import { Form, useNavigate } from "@remix-run/react";
import { Button } from "~/components/Button/Button";

export default function Theme() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <Dialog
      open={true}
      onOpenChange={(open: boolean) => {
        open ? () => {} : handleClose();
      }}
    >
      <DialogContent className="sm:max-w-[680px]">
        <DialogHeader>
          <DialogTitle>Adicionar passo</DialogTitle>
        </DialogHeader>
        <Form method="post">
          <div>
            <label htmlFor="id">id</label>
            <input type="text" name="id" />
          </div>
          <div>
            <label htmlFor="title">id</label>
            <input type="text" name="title" />
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>

            <Button type="submit">Criar tema</Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
