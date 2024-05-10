import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getAcademy, getThemesByAcademyId } from "~/.server/actions";
import { Button } from "~/components/Button/Button";
import Card, { CardTitle } from "~/components/Card/Card";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const academyId = params.academyId;

  if (!academyId) {
    throw new Response("Not Found", { status: 404 });
  }

  const academy = await getAcademy(academyId);

  if (!academy) {
    throw new Response("Not Found", { status: 404 });
  }

  const themes = await getThemesByAcademyId(academyId);

  return json({
    academy,
    themes,
  });
};

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { academy, themes } = useLoaderData<typeof loader>();

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
      </div>

      {themes?.data?.length ? (
        <div className="w-full grid grid-cols-1 gap-6 flex-1 overflow-y-auto hidden-scroll pb-2">
          {themes.data.map((theme: any) => (
            <Link to={`theme/${theme.id}`} key={theme.id}>
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
            </Link>
          ))}
        </div>
      ) : (
        <p className="uppercase text-center my-20">
          <i>No themes</i>
        </p>
      )}

      <Outlet />
    </div>
  );
}
