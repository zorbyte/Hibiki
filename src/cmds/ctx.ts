import { Message, TextChannel } from "eris";

export interface Context {
  msg: Message<TextChannel>;
  send(respID: string): Promise<void>
}
