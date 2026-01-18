import * as zod from "zod";

export const EditBoardTitleSchema = zod.object({ title: zod.string() });
export type EditBoardTitleSchemaType = zod.infer<typeof EditBoardTitleSchema>;

export const InputTitleSchema = zod.object({
  value: zod
    .string()
    .min(1, "Is required")
    .max(50, "Title must be less than 50 characters"),
});
