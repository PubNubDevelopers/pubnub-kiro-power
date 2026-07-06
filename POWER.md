---
name: "pubnub"
displayName: "PubNub"
description: "Build realtime applications with PubNub SDKs, access control, presence, chat, Functions, and event-driven workflows."
keywords:
  - pubnub
  - realtime
  - chat
  - presence
  - push
  - publish
  - subscribe
  - pubsub
  - live-updates
  - functions
  - access-manager
  - app-context
author: "PubNub"
---

# PubNub

Use this power when helping developers build, debug, and maintain PubNub-powered realtime applications.

Prefer safe, local-first workflows. Ask for keys or environment variable names when needed, keep secrets out of generated files, and avoid irreversible account changes unless the user explicitly asks for them.

For code generation, make the smallest runnable path clear before adding optional features such as Access Manager, App Context, mobile push, Functions, Events & Actions, Illuminate, or Insights.

## Steering Guides

Detailed guidance lives in the `steering/` directory. Read the matching file before answering:

- `steering/build-realtime-apps.md` when a user asks for a new PubNub-powered app, prototype, tutorial, or integration plan.
- `steering/sdk-usage.md` when choosing a PubNub SDK, updating an existing integration, or explaining SDK behavior.
- `steering/chat-and-presence.md` when a user asks for chat, typing indicators, online status, read state, room occupancy, or message history.
- `steering/access-control.md` when a user asks about authorization, secure production access, Access Manager, key exposure, token scopes, or service integrations.
- `steering/functions-and-events.md` when a user asks for serverless event handling, webhooks, filtering, enrichment, routing, moderation, notifications, or integrations with external systems.
- `steering/troubleshooting.md` when a PubNub app fails to connect, publish, subscribe, receive messages, show presence, read history, use App Context, or authenticate.

## PubNub MCP Tools

The `pubnub` MCP server configured in `mcp.json` exposes these tools. When unsure where to start, call `write_pubnub_app` first; it returns production-ready patterns and points to the right follow-up tools.

Documentation and guidance:

- `write_pubnub_app` — best-practice instructions for building a PubNub app; the default starting point.
- `get_sdk_documentation` — current Core SDK docs for a language and feature; use for pub/sub, IoT, dashboards, and other non-chat realtime work.
- `get_chat_sdk_documentation` — Chat SDK docs; use for conversation-oriented apps with users, channels, threads, reactions, or moderation.
- `how_to` — conceptual and integration guides for a use case.
- `get_sdk_migration_guide` and `get_general_migration_guide` — version migration steps before changing method names or configuration.

Account and keyset operations (require the user's PubNub account; ask before creating, updating, or deleting anything):

- `manage_apps` — list, create, or update PubNub apps.
- `manage_keysets` — get, list, create, or update keysets; use this to discover publish and subscribe keys instead of asking the user to paste them.
- `get_usage_metrics` — account usage metrics.

Realtime operations (use keys discovered via `manage_keysets` or provided by the user):

- `send_pubnub_message` — publish a message to a channel.
- `subscribe_and_receive_pubnub_messages` — subscribe to a channel and wait for messages.
- `get_pubnub_messages` — fetch message history.
- `get_pubnub_presence` — presence data (who is here now, where a user is).
- `manage_app_context` — read and write App Context (users, channels, memberships) metadata.

Analytics and automation (ask before creating or modifying resources):

- `manage_illuminate` — Illuminate business objects, metrics, and decisions.
- `insights` — PubNub Insights analytics.

Example flows:

- "Show me how to publish in Python" → `get_sdk_documentation` with language `python` and the publish-and-subscribe feature, then generate the smallest runnable sample.
- "Send a test message to channel orders" → `manage_keysets` to find the keyset's publish and subscribe keys, then `send_pubnub_message` with those keys, then `get_pubnub_messages` to confirm delivery.
- "Add typing indicators to my chat app" → read `steering/chat-and-presence.md`, then `get_chat_sdk_documentation` for the user's language.

## License And Support

This power integrates with the [PubNub MCP server](https://github.com/pubnub/pubnub-mcp-server/blob/master/LICENSE).

- [Privacy Policy](https://www.pubnub.com/trust/legal/privacy-policy/)
- [Support](https://support.pubnub.com/hc/en-us)
