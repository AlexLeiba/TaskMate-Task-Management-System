import { useState } from "react";
import { DialogBoardCard } from "./DialogBoardCard";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUnsplashImagesAction } from "@/app/actions/unsplash-images";
import { DialogBoardCardSkeleton } from "./DialogBoardCardSkeleton";
import { UNSPLASH_DEFAULT_IMAGES } from "@/lib/consts";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spacer } from "@/components/ui/spacer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputTitleSchema, InputTitleSchemaType } from "@/lib/schemas";
import { UnsplashImagesType } from "@/lib/types";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import { createNewBoardAction } from "@/app/actions/dashboard";
import { useStore } from "@/store/useStore";
import { type Board } from "@/lib/generated/prisma/client";

export function DialogBoardDetails() {
  const [selectedImage, setSelectedImage] = useState<UnsplashImagesType>();
  const { setNewBoardDialogOpen } = useStore();
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const organizationId = pathname.split("/").at(-1);

  const { data, isFetching } = useQuery({
    queryFn: getUnsplashImagesAction,
    queryKey: ["unsplash-images"],
    staleTime: 1000 * 60 * 60,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-new-board"],
    mutationFn: createNewBoardAction,
    onSuccess: () => {
      setValue("title", "");
      setSelectedImage(undefined);
      setNewBoardDialogOpen(false);
      toast.success("Board created successfully");
    },
    onError: ({ message }) => toast.error(message || "Error creating board"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm({
    resolver: zodResolver(InputTitleSchema),
    defaultValues: { title: "" },
  });

  function handleGetNewImages() {
    queryClient.invalidateQueries({ queryKey: ["unsplash-images"] });
  }

  async function onSubmitNewBoard(data: InputTitleSchemaType) {
    if (!selectedImage?.urls.full || !selectedImage?.urls.regular) {
      setError("title", { message: "Please select an image" });
      return toast.error("Please select an image");
    }
    if (!organizationId) {
      return toast.error("Please select an organization");
    }

    const newBoardData: Omit<
      Board,
      "id" | "createdAt" | "updatedAt" | "order"
    > = {
      title: data.title,
      cardImageUrl:
        selectedImage?.urls.small || selectedImage?.urls.regular || "",
      bgImageUrl: selectedImage?.urls.full || selectedImage?.urls.regular || "",
      orgId: organizationId,
    };
    mutate(newBoardData);
  }

  return (
    <div className="flex flex-col gap-12">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-2">
        {isFetching ? (
          <DialogBoardCardSkeleton />
        ) : (
          (data?.data || UNSPLASH_DEFAULT_IMAGES).map((image) => {
            return (
              <DialogBoardCard
                key={image.id}
                data={image}
                onClick={() => setSelectedImage(image)}
                selected={selectedImage?.id === image.id}
              />
            );
          })
        )}
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <Button
            disabled={isFetching || isPending}
            loading={isFetching}
            onClick={handleGetNewImages}
            variant={"tertiary"}
            title="Get new images"
            aria-label="Get new images"
          >
            <RefreshCw />
          </Button>
        </div>

        <div>
          <label htmlFor="title">
            <p>Board title</p>
          </label>
          <Spacer size={1} />
          <Input
            error={errors.title?.message}
            disabled={isFetching}
            id="title"
            placeholder="Type board title here..."
            {...register("title")}
          />
        </div>
        <Button
          disabled={isFetching || isPending}
          loading={isPending}
          onClick={handleSubmit(onSubmitNewBoard)}
          size={"lg"}
          type="button"
          variant="tertiary"
          className="w-full"
        >
          Create
        </Button>
      </div>
    </div>
  );
}
