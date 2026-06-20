import { useState, useEffect } from "react";
import { getModels } from "../../llm/getModels";
import { Box, Text } from "ink";
import { colors } from "./constants";

import { runCommit } from "../../cli/commit";
import { Action } from "./action";
import { ModelAction } from "./modelAction";

export const Commit = ({ onComplete }: { onComplete: () => void }) => {
  const [models, setModels] = useState<string[]>([]);
  const [commit, setCommit] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  useEffect(() => {
    getModels().then(setModels);
  }, []);

  useEffect(() => {
    if (models.length === 1) {
      setSelectedModel(models[0] ?? null);
    }
  }, [models]);

  useEffect(() => {
    if (selectedModel) {
      runCommit({ dryRun: false, model: selectedModel }).then(setCommit);
    }
  }, [selectedModel]);

  if (models.length === 0) {
    return (
      <Box paddingY={1}>
        <Text color={colors.muted}>
          <Text color={colors.accent}>›</Text> fetching your models
        </Text>
      </Box>
    );
  }

  if (!selectedModel) {
    return (
      <Box paddingY={1}>
        <Text color={colors.muted}>
          <Text color={colors.accent}>›</Text>
        </Text>
        <Box flexDirection="column">
          {models.map((model, index) => {
            return (
              <>
                <ModelAction
                  key={model}
                  model={model}
                  autoFocus={index === 0}
                  onSelect={(model) => {
                    setSelectedModel(model);
                  }}
                />
              </>
            );
          })}
        </Box>
      </Box>
    );
  }

  if (commit === null) {
    return (
      <Box paddingY={1}>
        <Text color={colors.muted}>
          <Text color={colors.accent}>›</Text> ghostscribe is reading your diff
        </Text>
      </Box>
    );
  }

  return (
    <>
      <Box flexDirection="column">
        <Box marginBottom={1}>
          <Text color={colors.accent} bold>
            ghostscribe
          </Text>
          <Text color={colors.muted}> — generated commit</Text>
        </Box>

        <Box
          flexDirection="column"
          paddingX={2}
          paddingY={1}
          borderStyle="single"
          borderColor={colors.border}
          backgroundColor={colors.commitBg}
          width="100%"
        >
          <Text color={colors.ghost}>{commit}</Text>
        </Box>

        <Box height={1} />

        <Box marginBottom={1}>
          <Text color={colors.ghost}>Commit with this message?</Text>
        </Box>

        <Box flexDirection="row" gap={4}>
          <Action
            label="Yes"
            shortcut="y"
            commit={commit}
            onComplete={onComplete}
            autoFocus
          />
          <Action
            label="No"
            shortcut="n"
            commit={commit}
            onComplete={onComplete}
          />
        </Box>
        <Box marginTop={1}>
          <Text color={colors.muted} dimColor>
            press <Text color={colors.ghost}>Enter</Text> to confirm,{" "}
            <Text color={colors.ghost}>Esc</Text> to cancel
          </Text>
        </Box>
      </Box>
    </>
  );
};
