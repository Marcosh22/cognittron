import type { LoaderFunctionArgs } from "@remix-run/node";
import { Button } from "~/components/Button/Button";
import Card, { CardTitle, CardDescription } from "~/components/Card/Card";

export async function loader({ params }: LoaderFunctionArgs) {
  return params.trailId;
}

export default function Step() {
  return (
    <div className="h-full flex flex-col">
      <div className="w-full flex items-center justify-between gap-4 mb-10">
        <h1 className="text-xl text-secondary-400 font-semibold line-clamp-2">
          Título da trilha
        </h1>
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
          <span className="hidden md:block">
          Adicionar passo
          </span>
        </Button>
      </div>
      <div className="w-full grid grid-cols-1 gap-6 flex-1 overflow-y-auto hidden-scroll pb-2">
        <Card>
          <CardTitle>Título do passo</CardTitle>
          <CardDescription>
            Conteúdo do passo. Vestibulum id ligula porta felis euismod semper.
            Donec sed odio dui. Curabitur blandit tempus porttitor. Cum sociis
            natoque penatibus et magnis dis parturient montes, nascetur
            ridiculus mus.
          </CardDescription>
        </Card>
        <Card>
          <CardTitle>Título do passo</CardTitle>
          <CardDescription>
            Conteúdo do passo. Vestibulum id ligula porta felis euismod semper.
            Donec sed odio dui. Curabitur blandit tempus porttitor. Cum sociis
            natoque penatibus et magnis dis parturient montes, nascetur
            ridiculus mus.
          </CardDescription>
        </Card>
        <Card>
          <CardTitle>Título do passo</CardTitle>
          <CardDescription>
            Conteúdo do passo. Vestibulum id ligula porta felis euismod semper.
            Donec sed odio dui. Curabitur blandit tempus porttitor. Cum sociis
            natoque penatibus et magnis dis parturient montes, nascetur
            ridiculus mus.
          </CardDescription>
        </Card>
        <Card>
          <CardTitle>Título do passo</CardTitle>
          <CardDescription>
            Conteúdo do passo. Vestibulum id ligula porta felis euismod semper.
            Donec sed odio dui. Curabitur blandit tempus porttitor. Cum sociis
            natoque penatibus et magnis dis parturient montes, nascetur
            ridiculus mus.
          </CardDescription>
        </Card>
      </div>
    </div>
  );
}
