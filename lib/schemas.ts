import * as zod from "zod";

export const EditBoardTitleSchema = zod.object({ title: zod.string() });
export type EditBoardTitleSchemaType = zod.infer<typeof EditBoardTitleSchema>;

export const InputTitleSchema = zod.object({
  title: zod
    .string()
    .min(1, "Is required")
    .max(100, "Title must be less than 100 characters"),
});

export type InputTitleSchemaType = zod.infer<typeof InputTitleSchema>;

export const NewNotificationSchema = zod.object({
  title: zod
    .string()
    .min(1, "Is required")
    .max(100, "Title must be less than 100 characters"),
  message: zod.string().min(1, "Is required"),
});

export type NewNotificationSchemaType = zod.infer<typeof NewNotificationSchema>;
