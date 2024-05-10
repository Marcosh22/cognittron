import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogTitle
} from "~/components/ui/dialog";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import { Button } from "~/components/Button/Button";
import { LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const academyId = params.id;

  if (!academyId) {
    throw new Response("Not Found", { status: 404 });
  }

  return academyId;
};

export default function AddTheme() {
  const navigate = useNavigate();
  const academyId = useLoaderData<typeof loader>();

  const handleClose = () => {
    navigate(`/academy/${academyId}`);
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
