#!/usr/bin/env bun
import { Command } from "commander";
import { render } from "ink";
import React from "react";
import { Index } from "../tui";

const program = new Command();

program
  .name("ghostscribe")
  .description("AI-powered git commit message generator")
  .version("0.1.0")
  .action(async () => {
    const { waitUntilExit } = render(React.createElement(Index));
    await waitUntilExit();
  });

program.parseAsync(process.argv);
