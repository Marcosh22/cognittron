import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "~/components/ui/dialog";
import { commitSession, getSession } from "../session";

import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import { Button } from "~/components/Button/Button";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { Input } from "~/components/ui/input";
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import { createTheme } from "~/.server/actions";

const schema = zod.object({
  id: zod
    .string()
    .min(3, "Please enter at least 3 characters.")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Please enter only letters (uppercase and lowercase), numbers, hyphens, and underscores."
    ),
  title: zod
    .string()
    .min(5, "Please enter at least 5 characters.")
    .max(80, "Please enter up to 80 characters."),
});

const resolver = zodResolver(schema);

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const academyId = params.academyId;

  if (!academyId) {
    throw new Response("Not Found", { status: 404 });
  }

  return academyId;
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const academyId = params.academyId;

  if (!academyId) {
    throw new Response("Not Found", { status: 404 });
  }

  const { receivedValues, errors, data } = await getValidatedFormData<
    zod.infer<typeof schema>
  >(request, resolver);

  if (errors) {
    return json({ errors, receivedValues });
  }

  const { id, title } = data;
  const createdTheme = await createTheme({ academyId, id, title });
  const session = await getSession(request.headers.get("Cookie"));

  let success = true;
  let message = "Theme added successfully!";

  if (createdTheme?.error) {
    success = false;
    message = createdTheme?.error;
  }

  session.flash("feedbackMessage", {
    type: success ? 'success' : 'error',
    message
  });

  return redirect(`/${academyId}`, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export default function AddTheme() {
  const navigate = useNavigate();
  const academyId = useLoaderData<typeof loader>();
  const { formState, handleSubmit, register } = useRemixForm<
    zod.infer<typeof schema>
  >({
    resolver,
  });

  const handleClose = () => {
    navigate(`/${academyId}`);
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
          <DialogTitle>Adicionar tema</DialogTitle>
        </DialogHeader>
        <Form method="post" onSubmit={handleSubmit} key={academyId}>
          <div className="py-10 grid gap-4">
            <div>
              <label
                className="inline-block text-sm text-secondary-350 font-semibold pl-1 pb-1"
                htmlFor="id"
              >
                id
              </label>
              <Input {...register("id")} type="text" name="id" />
              <small className="text-red-500">
                {formState.errors.id?.message}
              </small>
            </div>
            <div>
              <label
                className="inline-block text-sm text-secondary-350 font-semibold pl-1 pb-1"
                htmlFor="id"
              >
                Título
              </label>
              <Input {...register("title")} type="text" name="title" />
              <small className="text-red-500">
                {formState.errors.title?.message}
              </small>
            </div>
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
