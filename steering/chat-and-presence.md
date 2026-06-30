# Chat And Presence

Use this guidance when a user asks for chat, typing indicators, online status, read state, room occupancy, or message history.

## Chat Flow

- Use channel names that map to the conversation model, such as one room, one direct message thread, or one support case.
- Keep user identity stable across reconnects.
- Store user, channel, and membership metadata in App Context when the app needs profiles, room lists, roles, or display names.
- Use message actions or Chat SDK helpers for reactions, receipts, edits, moderation state, and related message metadata.
- Use storage and playback when users need message history after reconnecting or joining late.

## Presence Flow

- Use presence to answer who is online, occupancy counts, and where a user is currently active.
- Treat presence events as realtime signals, not as the only durable source of user state.
- Account for disconnect timeouts, mobile backgrounding, browser tab sleeps, and network changes.
- Prefer explicit application state for business-critical availability.

## Safe Defaults

- Use environment variables for keys.
- Use short-lived local channel names for demos.
- Avoid logging sensitive message bodies in production guidance.
- Add moderation, rate limits, and authorization before exposing public chat rooms.

## Failure Modes

- Presence does not appear because it is disabled on the keyset.
- Occupancy looks stale because clients disconnected uncleanly and timeout handling has not completed.
- History is empty because storage is disabled or retention is shorter than expected.
- User metadata is missing because App Context was not enabled or was written under a different user ID.

## Verification

- Subscribe two local clients to one channel.
- Publish a message from one client and confirm the other receives it.
- Enable presence for the keyset, then check occupancy for the channel.
- Write and read one user metadata record if App Context is part of the workflow.
