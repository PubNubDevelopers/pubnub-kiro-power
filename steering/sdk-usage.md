# SDK Usage

Use this guidance when choosing a PubNub SDK, updating an existing integration, or explaining SDK behavior.

## Choose The Right SDK

- Use Core SDK docs for publish and subscribe, presence, storage, App Context, files, mobile push, encryption, channel groups, and Access Manager.
- Use Chat SDK docs for conversation-oriented apps that need users, channels, memberships, messages, reactions, threads, typing indicators, unread counts, or moderation helpers.
- Use platform-specific SDKs when lifecycle, background execution, permissions, or deployment tooling matters.

## Version-Aware Workflows

- Ask for the target language, runtime, package manager, and existing SDK version.
- If the user is migrating, check the relevant migration guide before changing method names or configuration.
- Keep examples compatible with the selected SDK family.
- Prefer official PubNub docs or PubNub MCP resources like get_sdk_documentation / get_chat_sdk_documentation for current syntax.

## Implementation Pattern

1. Create or identify a PubNub client with publish key, subscribe key, and user ID.
2. Register listeners or subscription handlers before publishing test messages.
3. Subscribe to the target channels.
4. Publish a small JSON payload.
5. Add presence, storage, App Context, files, or push only when the base flow works.

## Common SDK Pitfalls

- Missing `userId` or UUID in modern SDK configuration.
- Publishing before a subscription listener is attached.
- Using a subscribe key from one keyset with a publish key from another.
- Expecting history, presence, App Context, or files to work when the feature is disabled on the keyset.
- Treating Access Manager tokens as permanent credentials.

## Good Answers Should Include

- The smallest runnable code path for the selected platform.
- Environment variable names instead of literal secret values.
- A note about keyset feature requirements when relevant.
- A short verification step that proves publish, subscribe, or presence works.
