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
import { InputTitleSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { KEYBOARD } from "@/lib/consts";

type Props = ComponentProps<"input"> & {
  children: React.ReactNode;
  inputName: string;
  placeholder?: string;
  label?: string;
  isOpenedTitleInput: boolean;
  loading?: boolean;
  classNameContainer?: string;
  type?: "text" | "textarea";
  setIsOpenedTitleInput: Dispatch<SetStateAction<boolean>>;
  handleSubmitValue: (value: { [inputName: string]: string }) => void;
};
export function AddNewInput({
  children,
  label,
  isOpenedTitleInput,
  loading,
  inputName,
  classNameContainer,
  type = "text",
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(InputTitleSchema),
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
    }
  }, [isOpenedTitleInput, setError, inputName, register]);

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === KEYBOARD.ENTER || e.key === KEYBOARD.SPACE) {
          setIsOpenedTitleInput(true);
        }
      }}
      onClick={() => setIsOpenedTitleInput(true)}
      ref={containerRef}
      title={label}
      aria-label={label}
      className={cn(
        "cursor-pointer hover:opacity-80 rounded-sm p-2",
        classNameContainer
      )}
    >
      {isOpenedTitleInput ? (
        <div className="flex gap-2 flex-col items-start">
          {label && (
            <label htmlFor={inputName} className="font-medium">
              {label}
            </label>
          )}
          <div className="flex gap-2">
            <form action="" onSubmit={handleSubmit(handleSubmitValue)}>
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
                  placeholder="Type here..."
                  className="w-45"
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
                  {...props}
                  error={
                    errors[inputName as keyof typeof errors]?.message as string
                  }
                />
              )}
            </form>
            <Button
              disabled={loading || props.disabled}
              title={`Close ${inputName} input`}
              aria-label={`Close ${inputName} input`}
              loading={loading}
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
        </div>
      ) : (
        children
      )}
    </div>
  );
}
