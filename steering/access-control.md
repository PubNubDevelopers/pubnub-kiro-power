# Access Control

Use this guidance when a user asks about authorization, secure production access, Access Manager, key exposure, token scopes, or service integrations.

## Key Handling

- Treat publish and subscribe keys as client configuration, not as proof of authorization.
- Keep secret keys, service integration credentials, and account API keys out of client apps.
- Use environment variables or managed secret storage for all sensitive values.
- Do not print real keys in generated logs or docs.

## Access Manager Pattern

- Generate tokens on a trusted server.
- Grant the minimum resources and operations required for the user's workflow.
- Use short token TTLs and refresh them deliberately.
- Bind tokens to the expected user identity when the app requires user-specific access.
- Revoke or rotate credentials when access changes.

## MCP And Account Operations

The PubNub MCP server can perform account-aware operations when `PUBNUB_API_KEY` is configured. Before using those operations:

- Confirm the user wants to inspect or change account resources.
- Prefer read-only inspection before mutation.
- Explain which app, keyset, channel, user, or resource will be affected.
- Avoid destructive changes unless the user explicitly requests them.

## Common Mistakes

- Shipping secret keys in mobile or browser code.
- Granting broad channel patterns when only one channel is needed.
- Forgetting to enable Access Manager on the keyset.
- Reusing expired tokens without a refresh path.
- Mixing development and production keysets.

## Answer Checklist

- Identify where token generation runs.
- Identify which channels, users, groups, or objects need access.
- State the minimal operations required.
- Keep code samples free of real credentials.
