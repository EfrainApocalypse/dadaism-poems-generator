"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useTransition } from "react";
import { insertPoemAction } from "./actions";

type Inputs = {
  text: string;
};

export default function InsertPoem() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    startTransition(async () => {
      const result = await insertPoemAction(data.text);

      if (!result.ok) {
        setMessage(result.error);
        return;
      }

      reset();
      setMessage("Poema enviado com sucesso.");
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="Insira uma frase curta aqui"
        {...register("text", { required: true })}
      />
      {errors.text ? <p>Digite um texto.</p> : null}
      {message ? <p>{message}</p> : null}
      <input type="submit" disabled={isPending} />
    </form>
  );
}
