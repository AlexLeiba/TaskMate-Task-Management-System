"use client";

import React, {
  ComponentProps,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { KEYBOARD } from "@/lib/consts";
import zod from "zod";

type PropsTextarea = ComponentProps<"textarea"> & {
  type?: "textarea";
};
type PropsInputText = ComponentProps<"input"> & {
  type?: "text";
};

type Props = {
  children: React.ReactNode;
  inputName: string;
  placeholder?: string;
  label?: string;
  isOpenedTitleInput: boolean;
  loading?: boolean;
  classNameContainer?: string;
  buttonDirection?: "row" | "column";

  setIsOpenedTitleInput: Dispatch<SetStateAction<boolean>>;
  handleSubmitValue: (value: { [inputName: string]: string }) => void;
} & (PropsTextarea | PropsInputText);
export function AddNewInput({
  children,
  label,
  isOpenedTitleInput,
  loading,
  inputName,
  classNameContainer,
  type = "text",
  buttonDirection = "row",
  setIsOpenedTitleInput,
  handleSubmitValue,

  ...props
}: Props) {
  const {
    setOpenTitleInput,
    setOpenNewCardInput,
    openNewCardInput,
    openTitleInput,
  } = useStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const InputSchema = zod.object({
    [inputName]: zod
      .string()
      .min(1, `${inputName} is required`)
      .max(50, `${inputName} must be less than 50 characters`),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm({
    resolver: zodResolver(InputSchema),
    defaultValues: {
      [inputName]: "",
    },
  });

  // DETECT CLICK OUTSIDE TO CLOSE INPUT
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpenedTitleInput &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpenedTitleInput(false);

        if (openTitleInput.isOpen) setOpenTitleInput({ id: "", isOpen: false });
        if (openNewCardInput.isOpen)
          setOpenNewCardInput({ id: "", isOpen: false });
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [
    openNewCardInput,
    openTitleInput,
    isOpenedTitleInput,
    setIsOpenedTitleInput,
    setOpenTitleInput,
    setOpenNewCardInput,
  ]);

  // CLEAR ERROR MESSAGES ON OPEN INPUT
  useEffect(() => {
    if (isOpenedTitleInput) {
      setError(inputName as keyof typeof register, { message: "" });
      setValue(inputName, "");
    }
  }, [isOpenedTitleInput, setError, inputName, register, setValue]);

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === KEYBOARD.ENTER || e.key === KEYBOARD.SPACE) {
          setIsOpenedTitleInput(true);
        }
      }}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpenedTitleInput(true);
      }}
      ref={containerRef}
      title={label}
      aria-label={label}
      className={cn("p-2", classNameContainer)}
    >
      {isOpenedTitleInput ? (
        <div className="flex gap-2 flex-col items-start ">
          {label && (
            <label htmlFor={inputName} className="font-medium">
              {label}
            </label>
          )}

          <form
            action=""
            onSubmit={handleSubmit(handleSubmitValue)}
            className="flex gap-2 items-center w-full"
          >
            {type === "textarea" ? (
              <Textarea
                onKeyDown={(e) => {
                  if (e.key === KEYBOARD.ENTER && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(handleSubmitValue)();
                  }
                }}
                {...register(inputName as keyof typeof register)}
                disabled={loading || props.disabled}
                id={inputName}
                autoFocus
                placeholder={props.placeholder || "Type here..."}
                className="w-full"
                error={
                  errors[inputName as keyof typeof errors]?.message as string
                }
              />
            ) : (
              <Input
                {...register(inputName as keyof typeof register)}
                disabled={loading || props.disabled}
                id={inputName}
                autoFocus
                placeholder="Type here..."
                className="w-full"
                error={
                  errors[inputName as keyof typeof errors]?.message as string
                }
              />
            )}
            <div
              className={cn(
                "flex",
                buttonDirection === "row" ? "flex" : "flex-col",
                "gap-1",
              )}
            >
              <Button
                type="submit"
                size={"sm"}
                disabled={loading || props.disabled}
                title={`Add comment`}
                aria-label={`Add comment`}
                loading={loading}
                variant={"tertiary"}
              >
                <Plus />
              </Button>

              <Button
                size={"sm"}
                disabled={loading || props.disabled}
                title={`Close ${inputName} input`}
                aria-label={`Close ${inputName} input`}
                variant={"ghost"}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpenedTitleInput(false);
                  setOpenTitleInput({ id: "", isOpen: false });
                  setOpenNewCardInput({ id: "", isOpen: false });
                }}
              >
                <X />
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="cursor-pointer hover:opacity-80">{children}</div>
      )}
    </div>
  );
}
