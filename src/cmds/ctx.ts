import { Message, TextChannel } from "eris";

export interface Context {
    msg: Message<TextChannel>
}