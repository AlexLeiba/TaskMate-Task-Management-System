import * as zod from "zod";

export const EditBoardTitleSchema = zod.object({ title: zod.string() });
export type EditBoardTitleSchemaType = zod.infer<typeof EditBoardTitleSchema>;
