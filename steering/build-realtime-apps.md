# Build Realtime Apps

Use this guidance when a user asks for a new PubNub-powered app, prototype, tutorial, or integration plan.

## Start Small

- Identify the app type: chat, collaboration, notifications, IoT, live dashboards, gaming, support, or workflow automation.
- Pick the client platform and SDK before writing code.
- Start with one publish channel, one subscribe channel, and one user ID.
- Read keys from environment variables such as `PUBNUB_PUBLISH_KEY`, `PUBNUB_SUBSCRIBE_KEY`, and `PUBNUB_USER_ID`.
- Add optional features only after the basic publish and subscribe loop works.

## Minimal JavaScript Shape

This example targets Node.js; `process.env` does not exist in browsers, so browser samples need keys injected at build time or entered at runtime.

```js
import PubNub from "pubnub";

const pubnub = new PubNub({
  publishKey: process.env.PUBNUB_PUBLISH_KEY,
  subscribeKey: process.env.PUBNUB_SUBSCRIBE_KEY,
  userId: process.env.PUBNUB_USER_ID ?? "local-user",
});

const channel = "hello-pubnub";

// Wait for the subscription to connect before publishing, then keep the
// process alive until the published message loops back.
const connected = new Promise(resolve => {
  pubnub.addListener({
    status: event => {
      if (event.category === "PNConnectedCategory") {
        resolve();
      }
    },
  });
});

const received = new Promise(resolve => {
  const subscription = pubnub.channel(channel).subscription();
  subscription.onMessage = event => {
    console.log("message", event.message);
    resolve(event.message);
  };
  subscription.subscribe();
});

await connected;
await pubnub.publish({
  channel,
  message: { text: "Hello from PubNub" },
});

await received;
pubnub.unsubscribeAll();
```

## Architecture Notes

- Model channels around the product domain, not only around UI screens.
- Keep public client keys separate from server-only secrets.
- Use Access Manager tokens for production authorization.
- Use App Context when user, channel, or membership metadata needs to be queried or updated.
- Use Functions or Events & Actions when events need server-side validation, fan-out, routing, enrichment, or integration with external services.

## Safety Notes

- Do not commit real keys.
- Do not create or modify account resources unless the user asks.
- Do not assume a feature is enabled on a keyset; guide the user to verify keyset settings when publish, subscribe, presence, storage, App Context, or push behavior fails.
- Prefer local samples that can be deleted easily.
