# Troubleshooting

Use this guidance when a PubNub app fails to connect, publish, subscribe, receive messages, show presence, read history, use App Context, or authenticate.

## Fast Triage

- Confirm the publish key and subscribe key belong to the same keyset.
- Confirm the user ID is present and stable.
- Confirm the channel name matches exactly on publish and subscribe.
- Attach listeners before publishing a test message.
- Check whether the required keyset features are enabled.
- Separate client-side errors from server-side or account API errors.

## Connection And Messaging

- If subscribe receives nothing, verify network connectivity, channel names, listener registration, and keyset pairing.
- If publish fails, inspect the error status and confirm publish is enabled for the keyset.
- If messages arrive twice, check for duplicate subscriptions, repeated listener setup, or reconnect logic that adds handlers repeatedly.
- If messages arrive late, inspect client lifecycle, background behavior, network proxies, and event loop blocking.

## Browser And Mobile

- For browser apps, check CORS, bundler environment variable exposure, mixed content, and blocked network requests.
- For mobile apps, check background execution limits, notification permissions, lifecycle hooks, and token refresh timing.
- For React or other component frameworks, clean up subscriptions during unmount or route changes.

## Feature-Specific Checks

- Presence requires the feature to be enabled and may reflect timeout behavior after abrupt disconnects.
- Storage and playback require storage to be enabled before the target messages are sent.
- App Context requires the Objects feature and consistent user, channel, and membership IDs.
- Access Manager requires enabled authorization and valid non-expired tokens.
- Push requires platform credentials, device registration, and correct channel associations.

## Debugging Discipline

- Reproduce with one channel, one user, and one message.
- Log errors without printing secrets.
- Compare behavior with a known-good keyset only when the user has permission.
- Capture exact SDK version, runtime, and platform.
- Prefer a minimal runnable sample over broad rewrites.
