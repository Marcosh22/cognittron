import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { getTheme, getTrailsByThemeId, initializeData } from "~/.server/actions";
import { Trail } from "~/.server/lib/trail/application/usecase/listByThemeId/listByThemeId.trail.dto";
import { Button } from "~/components/Button/Button";
import Card, { CardTitle } from "~/components/Card/Card";
import { useToast } from "~/components/ui/use-toast";
import { commitSession, getSession } from "~/session";

const ROWS_LIMIT = 100;

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  await initializeData();

  const themeId = params.themeId;

  if (!themeId) {
    throw new Response("Not Found", { status: 404 });
  }

  const theme = await getTheme(themeId);

  if (!theme) {
    throw new Response("Not Found", { status: 404 });
  }

  const session = await getSession(request.headers.get("Cookie"));
  const actionResponse = session.get("feedbackMessage") || null;

  const trails = await getTrailsByThemeId({
    themeId,
    limit: ROWS_LIMIT,
  });

  return json(
    {
      actionResponse,
      theme,
      trails,
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
    (match) => match.id === "routes/theme.$themeId"
  )?.data as { theme: any };

  const themeData = loaderData?.theme;

  return [
    { title: themeData?.title },
    {
      name: "description",
      content: `This is my Theme ${themeData?.title} Description`,
    },
  ];
};

export default function Index() {
  const { actionResponse, theme, trails } = useLoaderData<typeof loader>();
  const { toast } = useToast()

  useEffect(() => {
    if(actionResponse?.message) {
      toast({
        title: actionResponse.type === "success" ? "Success!" : "Error",
        description: actionResponse.message,
        variant: actionResponse.type === 'success' ? 'success' : 'destructive'
      })
    }
  }, [actionResponse, toast])

  return (
    <div className="h-full flex flex-col">
      <div className="w-full flex items-center justify-between gap-4 mb-10">
        <h1 className="text-xl text-secondary-400 font-semibold line-clamp-2">
          {theme.title}
        </h1>
        <Link to="add-trail">
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
            <span className="hidden md:block">Adicionar trilha</span>
          </Button>
        </Link>
        <Outlet />
      </div>

      {trails?.data?.length ? (
        <div className="w-full flex-1 overflow-hidden">
          <div className="w-full h-full flex flex-col gap-4 overflow-y-auto hidden-scroll pb-2">
            {trails.data.map((trail: Trail) => (
              <NavLink to={`/explore/${trail.id}`} key={`trail-${trail.id}`}>
                <Card>
                  <CardTitle>
                    <span className="flex w-full items-center justify-between gap-4">
                      {trail.title}
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.9821 10.75L11.1161 6.88398L12.8839 5.11621L19.7677 12.0001L12.8839 18.884L11.1161 17.1162L14.9823 13.25H6V10.75H14.9821Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                  </CardTitle>
                </Card>
              </NavLink>
            ))}
          </div>
        </div>
      ) : (
        <p className="uppercase text-center my-20">
          <i>No trails</i>
        </p>
      )}
    </div>
  );
}
