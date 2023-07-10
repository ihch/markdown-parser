import { join } from "std/path";

const DENO_MARKDOWN_PARSER_PREFIX = "deno-mp-";

async function writeTextToFile(text: string): Promise<string> {
  const tempFilePath = await Deno.makeTempFile({
    prefix: DENO_MARKDOWN_PARSER_PREFIX,
  });
  const file = await Deno.open(tempFilePath, { write: true });
  await Deno.write(file.rid, new TextEncoder().encode(text));
  return tempFilePath;
}

function removeTextFile(filePath: string): Promise<void> {
  if (!filePath.startsWith(join("/tmp", DENO_MARKDOWN_PARSER_PREFIX))) {
    throw new Error("No such file");
  }
  return Deno.remove(filePath);
}

export async function diff(o: string, n: string): Promise<string> {
  let oldFilePath, newFilePath;
  let diffResult;

  try {
    oldFilePath = await writeTextToFile(o);
    newFilePath = await writeTextToFile(n);

    const command = new Deno.Command(`diff`, {
      args: ["-u", oldFilePath, newFilePath],
      stdout: "piped",
    });
    const process = command.spawn();
    const output = await process.output();
    diffResult = new TextDecoder().decode(output.stdout);
  } finally {
    oldFilePath && removeTextFile(oldFilePath);
    newFilePath && removeTextFile(newFilePath);
  }

  return diffResult;
}
