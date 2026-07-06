# Functions And Events

Use this guidance when a user asks for serverless event handling, webhooks, filtering, enrichment, routing, moderation, notifications, or integrations with external systems.

## Choose The Event Mechanism

- Use PubNub Functions when logic needs to run close to PubNub events and can fit the Functions runtime.
- Use Events & Actions when the user needs configured event routing, webhooks, integrations, or automation around PubNub activity.
- Use an external backend when the workflow requires private dependencies, long-running jobs, complex state, or infrastructure-specific controls.

## Good Workflow

1. Identify the triggering event, such as message publish, signal, file event, presence, object event, or webhook.
2. Define the exact side effect, such as validation, enrichment, routing, alerting, notification, or analytics.
3. Keep the first implementation observable with clear logs or a test channel.
4. Use disposable development channels before touching production traffic.
5. Document rollback steps for any production change.

## Safety Notes

- Ask before creating or updating Functions, Events & Actions, Illuminate, or Insights resources.
- Avoid workflows that duplicate messages endlessly.
- Never include real secrets in code snippets.
- Keep webhook signing, authentication, and retry behavior explicit.
- Protect user data when forwarding payloads to third-party services.

## Testing

- Publish a known test message.
- Confirm the event fired exactly once.
- Verify the transformed output or webhook request.
- Check logs or action history for errors.
- Confirm failures are visible and do not silently drop critical events.

## When To Escalate Design

- The workflow affects billing, production traffic, compliance, security, or customer data.
- The action can delete, mutate, or fan out large volumes of messages.
- The user needs guaranteed delivery semantics beyond the selected PubNub feature.
