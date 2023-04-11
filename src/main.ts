import { execFileSync } from "child_process";
import { join } from "path";
import { getInput, setOutput, setFailed } from "@actions/core";

async function main() {
    try {
        const name = getInput("name", { required: true });
        const cmd = getInput("cmd", { required: true });
        const workingDirectory = getInput("working-directory") || "./tf/applications/ubiquity";
        const [file, ...args] = cmd.split(/\s/g).filter(Boolean);
        const output = execFileSync(file, args, {
            cwd: join(process.cwd(), workingDirectory),
            encoding: "utf8",
        });
        setOutput(name, output);
    } catch (err) {
        if (err instanceof Error) setFailed(err);
    }
}

main();
