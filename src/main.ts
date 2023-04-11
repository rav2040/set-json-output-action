import { execFileSync } from "child_process";
import { getInput, setOutput, setFailed } from "@actions/core";

const CMD_SPLIT_REGEX = /\s+(?=([^"]*"[^"]*")*[^"]*$)/g;

async function main() {
    try {
        const name = getInput("name");
        const cmd = getInput("cmd");
        const [file, ...args] = cmd.split(CMD_SPLIT_REGEX);
        const output = execFileSync(file, args, { encoding: "utf8" });
        setOutput(name, output);
    } catch (err) {
        if (err instanceof Error) setFailed(err);
    }
}

main();
