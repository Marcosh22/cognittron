import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { getAcademy, getThemesByAcademyId, initializeData } from "~/.server/actions";
import { Theme } from "~/.server/lib/theme/application/usecase/listByAcademyId/listByAcademyId.theme.dto";
import { Button } from "~/components/Button/Button";
import Card, { CardTitle } from "~/components/Card/Card";
import { useToast } from "~/components/ui/use-toast";
import { commitSession, getSession } from "~/session";

const ROWS_LIMIT = 100;

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  await initializeData();

  const academyId = params.academyId;

  if (!academyId) {
    throw new Response("Not Found", { status: 404 });
  }

  const academy = await getAcademy(academyId);

  if (!academy) {
    throw new Response("Not Found", { status: 404 });
  }

  const session = await getSession(request.headers.get("Cookie"));
  const actionResponse = session.get("feedbackMessage") || null;

  const themes = await getThemesByAcademyId({
    academyId,
    limit: ROWS_LIMIT,
  });

  return json(
    {
      actionResponse,
      academy,
      themes,
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
    (match) => match.id === "routes/_academy.$academyId"
  )?.data as { academy: any };

  const academyData = loaderData?.academy;

  return [
    { title: academyData?.title },
    {
      name: "description",
      content: `This is my Academy ${academyData?.title} Description`,
    },
  ];
};

export default function Index() {
  const { actionResponse, academy, themes } = useLoaderData<typeof loader>();
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
          {academy.title}
        </h1>
        <Link to="add-theme">
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
            <span className="hidden md:block">Adicionar tema</span>
          </Button>
        </Link>
        <Outlet />
      </div>

      {themes?.data?.length ? (
        <div className="w-full flex-1 overflow-hidden">
          <div className="w-full h-full flex flex-col gap-4 overflow-y-auto hidden-scroll pb-2">
            {themes.data.map((theme: Theme) => (
              <NavLink to={`/theme/${theme.id}`} key={`theme-${theme.id}`}>
                <Card>
                  <CardTitle>
                    <span className="flex w-full items-center justify-between gap-4">
                      {theme.title}
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
          <i>No themes</i>
        </p>
      )}
    </div>
  );
}
