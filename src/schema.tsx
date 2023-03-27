import { z } from "zod";

const formFields = ["TEXT","TEXT_AREA","SELECT"] as const;
const formFieldType = z.enum(formFields);

const BaseFormField = z.object({
    id: z.string(),
    name: z.string(),
    label: z.string(),
    required: z.boolean(),
    type: formFieldType,
  });


export {BaseFormField}