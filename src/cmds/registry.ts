import { $TSFIX, Asyncable } from "../utils/type_utils";
import { Context } from "./ctx";

type Runner = (ctx: Context) => Asyncable<unknown>;

export interface Command {
  name: string;
  desc?: string;
  args?: $TSFIX;
  perms?: $TSFIX;
  aliases: Set<string>;
  runner: Runner;
}

const commands = new Map<string, Command>();

export function find(nameOrAlias: string) {
  const foundCmd = commands.get(nameOrAlias);
  if (foundCmd) return foundCmd;

  for (const cmd of commands.values()) {
    const hasAlias = cmd.aliases.has(nameOrAlias);
    if (hasAlias) return cmd;
  }
}

/** Compiles multiple runners into an iteratively ran set of runners */
export function runner(...runners: Runner[]) {
  async function compiledRunner(ctx: Context) {
    return await Promise.all(
      runners.map(async rn => {
        return await rn(ctx);
      })
    );
  }

  return compiledRunner as Runner;
}

type RegisterOpts = Omit<Command, "name" | "aliases" | "runner">;

/** Registers a command */
export function register(
  callKeys: [name: string, ...aliases: string[]],
  runner: Runner,
  opts: RegisterOpts = {}
) {
  const [name, ...aliases] = callKeys;
  const cmd: Command = {
    name,
    aliases: new Set(aliases),
    args: void 0,
    runner,
    ...opts,
  };

  commands.set(name, cmd);

  return cmd;
}

register(
  ["ping", "p"],
  runner(ctx => ctx.send("the.identifier.for.the.translation.entry")),
  {
    perms: "optional: however the perms shit would work",
    desc: "An optional description",
    args: "optional: the argument shit",
  }
);
