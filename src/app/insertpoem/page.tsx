"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTransition } from "react";
import { insertPoemAction } from "./actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { toast, Toaster } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Inputs = {
  text: string;
};

export default function InsertPoem() {
  const [isPending, startTransition] = useTransition();
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    startTransition(async () => {
      const result = await insertPoemAction(data.text);

      if (!result.ok) {
        toast.error(result.error, { position: "top-center" });
        return;
      }

      reset();
      toast.success("Poema enviado com sucesso.", { position: "top-center" });
    });
  };

  const onInvalidSubmit = () => {
    toast.error("Digite um texto.", { position: "top-center" });
  };

  return (
    <div className="w-full max-w-md">
      <Toaster />
      <Card className="">
        <CardHeader>
          <CardTitle>Inserir poema</CardTitle>
          <CardDescription>Insira seu poema abaixo</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}
            id="poem-form"
          >
            <Input
              className="mb-2"
              placeholder="Insira uma frase curta aqui"
              {...register("text", { required: true })}
            />
          </form>
        </CardContent>
        <CardFooter className="p-2">
          <Button
            form="poem-form"
            type="submit"
            disabled={isPending}
            className="w-full p-5"
          >
            {isPending ? "Enviando..." : "Enviar poema"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
