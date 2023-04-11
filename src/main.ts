import { execFileSync } from "child_process";
import { getInput, setOutput, setFailed } from "@actions/core";

async function main() {
    try {
        const name = getInput("name");
        const cmd = getInput("cmd");
        const [file, ...args] = cmd.split(/\s+/g);
        const output = execFileSync(file, args, { encoding: "utf8" });
        console.log(output);
        setOutput(name, output);
    } catch (err) {
        if (err instanceof Error) setFailed(err);
    }
}

main();
