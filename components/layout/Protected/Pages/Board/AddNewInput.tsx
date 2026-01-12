import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import React, {
  ComponentProps,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import { useForm } from "react-hook-form";

type Props = ComponentProps<"input"> & {
  children: React.ReactNode;
  inputName: string;
  placeholder?: string;
  label: string;
  isOpenedTitleInput: boolean;
  loading?: boolean;
  setIsOpenedTitleInput: Dispatch<SetStateAction<boolean>>;
  handleSubmitValue: (value: { [inputName: string]: string }) => void;
};
export function AddNewInput({
  children,
  label,
  isOpenedTitleInput,
  loading,
  inputName,
  setIsOpenedTitleInput,
  handleSubmitValue,

  ...props
}: Props) {
  const containerRef = useRef<HTMLButtonElement>(null);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      [inputName]: "",
    },
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpenedTitleInput &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpenedTitleInput(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpenedTitleInput, setIsOpenedTitleInput]);

  return (
    <button
      onClick={() => setIsOpenedTitleInput(true)}
      ref={containerRef}
      title={label}
      aria-label={label}
      className="cursor-pointer hover:opacity-80 rounded-sm p-2"
    >
      {isOpenedTitleInput ? (
        <div className="flex gap-2 flex-col items-start">
          <label htmlFor={label}>{label}</label>
          <div className="flex gap-2">
            <form action="" onSubmit={handleSubmit(handleSubmitValue)}>
              <Input
                {...register(inputName)}
                disabled={loading}
                id={label}
                autoFocus
                placeholder="Type here..."
                className="w-full"
                {...props}
              />
            </form>
            <Button
              title={`Close ${label} input`}
              aria-label={`Close ${label} input`}
              asChild
              loading={loading}
              variant={"ghost"}
              onClick={(e) => {
                e.stopPropagation();
                setIsOpenedTitleInput(false);
              }}
            >
              <X />
            </Button>
          </div>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
