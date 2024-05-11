import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { getStepsByTrailId, getTrail, initializeData } from "~/.server/actions";
import { Step } from "~/.server/lib/step/application/usecase/listByTrailId/listByTrailId.step.dto";
import { Button } from "~/components/Button/Button";
import Card, { CardDescription, CardTitle } from "~/components/Card/Card";
import { useToast } from "~/components/ui/use-toast";
import { commitSession, getSession } from "~/session";

const ROWS_LIMIT = 100;

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  await initializeData();

  const trailId = params.trailId;

  if (!trailId) {
    throw new Response("Not Found", { status: 404 });
  }

  const trail = await getTrail(trailId);

  if (!trail) {
    throw new Response("Not Found", { status: 404 });
  }

  const session = await getSession(request.headers.get("Cookie"));
  const actionResponse = session.get("feedbackMessage") || null;

  const steps = await getStepsByTrailId({
    trailId,
    limit: ROWS_LIMIT,
  });

  return json(
    {
      actionResponse,
      trail,
      steps,
    },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
};

export const meta: MetaFunction = ({ matches }) => {
  const loaderData = matches.find(
    (match) => match.id === "routes/explore.$trailId"
  )?.data as { trail: any };

  const trailData = loaderData?.trail;

  return [
    { title: trailData?.title },
    {
      name: "description",
      content: `This is my Trail ${trailData?.title} Description`,
    },
  ];
};

export default function Index() {
  const { actionResponse, trail, steps } = useLoaderData<typeof loader>();
  const { toast } = useToast();

  useEffect(() => {
    if (actionResponse?.message) {
      toast({
        title: actionResponse.type === "success" ? "Success!" : "Error",
        description: actionResponse.message,
        variant: actionResponse.type === "success" ? "success" : "destructive",
      });
    }
  }, [actionResponse, toast]);

  return (
    <div className="h-full flex flex-col">
      <div className="w-full flex items-center justify-between gap-4 mb-10">
        <h1 className="text-xl text-secondary-400 font-semibold line-clamp-2">
          {trail.title}
        </h1>
        <Link to="add-step">
          <Button className="gap-[10px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M9.16669 10.8333V15.8333H10.8334V10.8333H15.8334V9.16667H10.8334V4.16667H9.16669V9.16667H4.16669V10.8333H9.16669Z"
                fill="currentColor"
              />
            </svg>
            <span className="hidden md:block">Adicionar passo</span>
          </Button>
        </Link>
        <Outlet />
      </div>

      {steps?.data?.length ? (
        <div className="w-full flex-1 overflow-hidden">
          <div className="w-full h-full flex flex-col gap-4 overflow-y-auto hidden-scroll pb-2">
            {steps.data.map((step: Step) => (
              <Card key={`step-${step.id}`}>
                <CardTitle>{step.title}</CardTitle>
                <CardDescription>{step.content}</CardDescription>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <p className="uppercase text-center my-20">
          <i>No steps</i>
        </p>
      )}
    </div>
  );
}
