import { de } from "date-fns/locale";
import * as zod from "zod";

export const EditBoardTitleSchema = zod.object({ title: zod.string() });
export type EditBoardTitleSchemaType = zod.infer<typeof EditBoardTitleSchema>;

export const InputTitleSchema = zod.object({
  title: zod
    .string()
    .min(1, "Is required")
    .max(50, "Title must be less than 50 characters"),
});

export type InputTitleSchemaType = zod.infer<typeof InputTitleSchema>;

export const NewNotificationSchema = zod.object({
  title: zod
    .string()
    .min(1, "Is required")
    .max(50, "Title must be less than 50 characters"),
  message: zod
    .string()
    .min(1, "Is required")
    .max(50, "Message must be less than 500 characters"),
});

export type NewNotificationSchemaType = zod.infer<typeof NewNotificationSchema>;
