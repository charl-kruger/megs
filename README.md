# Azure App Service Deployment Tutorial MCP Server

This MCP server interacts as a step-by-step tutorial for deploying to Azure App Service using remote MCP tools (no authentication required).

## Features

- Guides user through every step: project setup, prerequisites, resource group creation, plan setup, app deploy, and validation
- Works with Cloudflare's AI Playground, Claude Desktop, Windsurf, Cursor, etc.
- Easily extend with more steps or deeper automation

## Deploy on Cloudflare Workers

[![Deploy to Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/your-repo-here)

## Try it now

- Deploy the project above
- Open https://playground.ai.cloudflare.com/
- Enter your deployed MCP server URL (e.g., `https://azure-appservice-mcp-tutorial.<your-account>.workers.dev/sse`)
- Start using the tools! The agent will walk you through setup, resource provisioning, app deployment, and post-deployment recommendations (all placeholder logic—swap in your content as needed).

## Add your own content

Edit `src/index.ts` and adjust the content for each step/tool to match your real Azure App Service tutorial content or logic.

---

## Example tool invocation (with curl)

You can also invoke tools directly with HTTP POST requests, for testing:

```sh
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"tool":"create_resource_group","params":{"resource_group":"mygroup","region":"westeurope"}}' \
  https://azure-appservice-mcp-tutorial.<your-account>.workers.dev/mcp
```

## Basic test/usage

Try these tools (example prompts):

- introduction
- gather_project_info
- check_prereqs
- create_resource_group
- create_app_service_plan
- create_web_app
- deploy_code
- validate_deployment
- next_steps

---

For more details, visit Cloudflare's Agents and MCP documentation.