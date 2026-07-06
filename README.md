# PubNub Kiro Power

This Kiro Power helps developers build, debug, and maintain PubNub-powered realtime applications. It focuses on practical workflows for SDK setup, publish and subscribe, chat and presence, App Context, Access Manager, Functions, Events & Actions, safe key handling, and troubleshooting.

The package includes an MCP configuration for the published PubNub MCP server. The MCP server gives Kiro access to PubNub documentation, realtime operations, and account and keyset operations.

## Contents

- `POWER.md` defines the Power identity, steering guide routing, and MCP tool usage.
- `mcp.json` configures PubNub MCP with optional environment-variable placeholders only.
- `steering/build-realtime-apps.md` covers minimal app setup and architecture choices.
- `steering/sdk-usage.md` covers SDK selection and version-aware usage.
- `steering/chat-and-presence.md` covers message flow, presence, and App Context.
- `steering/access-control.md` covers Access Manager and key safety.
- `steering/functions-and-events.md` covers Functions, Events & Actions, webhooks, and automation patterns.
- `steering/troubleshooting.md` covers common runtime, auth, channel, CORS, and network issues.

## Install In Kiro

Use Kiro's documented Power installation flow and select this repository folder as a local Power source. After installation, Kiro should show the local package as `pubnub-kiro-power`, with the `PubNub` display name from `POWER.md`. If using Kiro's internal power tool directly, activate `pubnub-kiro-power`; the domain name inside `POWER.md` remains `pubnub`.

For local validation before installing:

```bash
npm test
git diff --check
```

## MCP Configuration

`mcp.json` uses the published PubNub MCP package:

```json
{
  "mcpServers": {
    "pubnub": {
      "command": "npx",
      "args": ["-y", "@pubnub/mcp@latest"],
      "env": {
        "PUBNUB_API_KEY": "${PUBNUB_API_KEY}",
        "PUBNUB_USER_ID": "${PUBNUB_USER_ID}"
      }
    }
  }
}
```

Both variables are optional. `PUBNUB_API_KEY` unlocks account and keyset management operations, and `PUBNUB_USER_ID` identifies the SDK user for local realtime calls. Publish and subscribe keys are not configured here; they are selected dynamically through the `manage_keysets` tool, so the configuration is not tied to a single keyset. Set real values in your shell, local Kiro MCP settings, or another secret store. Never commit real PubNub keys or service integration credentials.

PubNub also offers a hosted MCP server at `https://mcp.pubnub.com` (OAuth authentication, no environment variables) for tools that support remote MCP servers:

```json
{
  "mcpServers": {
    "pubnub": {
      "url": "https://mcp.pubnub.com"
    }
  }
}
```

When Kiro installs this Power, it namespaces the included MCP server as `power-pubnub-kiro-power-pubnub`. Inside the Power activation response, the server is still presented as `pubnub`.

## Safe Usage Guidance

- Prefer environment variables over hardcoded keys.
- Use demo or disposable keysets for experiments.
- Ask before creating, updating, or deleting PubNub apps, keysets, users, channels, Functions, Events & Actions, Illuminate objects, or Insights workflows.
- Keep generated samples small until the user confirms the app shape.
- Verify SDK-specific syntax against PubNub docs when the target language or SDK version matters.

## Local Smoke Test

After installing the Power in Kiro, try a prompt like:

```text
Using the PubNub Power, help me create the smallest local JavaScript publish and subscribe sample. Use environment variables for keys and do not expose secrets.
```

Expected behavior:

- Kiro uses PubNub-specific steering.
- Generated code reads keys from environment variables.
- The answer explains how to run the sample locally.
- The workflow avoids paid or irreversible account changes unless explicitly requested.

## Official References

- Kiro Powers documentation: https://kiro.dev/docs/powers/
- PubNub MCP server documentation: https://www.pubnub.com/docs/ai/pubnub-mcp-server
- PubNub SDK documentation: https://www.pubnub.com/docs/sdks
- PubNub Chat SDK documentation: https://www.pubnub.com/docs/chat
- PubNub Access Manager documentation: https://www.pubnub.com/docs/general/security/access-control
- PubNub Functions documentation: https://www.pubnub.com/docs/serverless/functions/overview

## License And Support

This Power follows the PubNub Software Development Kit License Agreement included in `LICENSE`.

For product documentation, use the official PubNub docs. For issues with the published PubNub MCP package, use the support and issue channels documented by PubNub.
