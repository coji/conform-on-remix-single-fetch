import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import type { ActionFunctionArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { z } from "zod";

const schema = z.object({
  name: z.string(),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const submission = parseWithZod(await request.formData(), { schema });
  return { lastResult: submission.reply() };
};

export default function Index() {
  const actionData = useActionData<typeof action>();
  const [form, { name }] = useForm({
    lastResult: actionData?.lastResult,
    onValidate: ({ formData }) => parseWithZod(formData, { schema }),
  });

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <Form method="POST" {...getFormProps(form)}>
        <input {...getInputProps(name, { type: "text" })} />
        <button>submit</button>
      </Form>
    </div>
  );
}
