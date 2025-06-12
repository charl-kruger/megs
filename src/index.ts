// src/index.ts
import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

/**
 * AzureAppServiceMCP - An MCP server that guides users through
 * deploying an app service into Azure, step-by-step tutorial style.
 */
export class AzureAppServiceMCP extends McpAgent {
  server = new McpServer({
    name: "Azure App Service Tutorial",
    version: "1.0.0"
  });

  async init() {
    // Step 1: Introduction
    this.server.tool(
      "introduction",
      "Introduces the Azure App Service deployment tutorial with an overview.",
      {},
      async (_params) => ({
        content: [{ type: "text", text: "Welcome to the Azure App Service deployment tutorial! [PLACEHOLDER: Introduce tutorial goal and prerequisites here.]" }]
      })
    );

    // Step 2: Gather Project Info
    this.server.tool(
      "gather_project_info",
      "Collects info about the user's app to be deployed to Azure App Service.",
      {
        app_name: z.string().describe("Name of your application."),
        runtime: z.enum(["Node.js", "Python", ".NET", "Java", "PHP"]).describe("App runtime environment."),
        region: z.string().describe("Preferred Azure region for deployment.")
      },
      async ({ app_name, runtime, region }, _context) => ({
        content: [{ type: "text", text: `[PLACEHOLDER] Collected info: App Name: ${app_name}, Runtime: ${runtime}, Region: ${region}.` }]
      })
    );

    // Step 3: Prerequisite Check
    this.server.tool(
      "check_prereqs",
      "Checks if the user has the required Azure CLI and account setup.",
      {},
      async () => ({
        content: [{ type: "text", text: "[PLACEHOLDER] Please ensure you have the Azure CLI installed and are logged in. Instructions: ..." }]
      })
    );

    // Step 4: Resource Group Creation
    this.server.tool(
      "create_resource_group",
      "Guides user to create an Azure Resource Group.",
      {
        resource_group: z.string().describe("Resource group name."),
        region: z.string().describe("Azure region.")
      },
      async ({ resource_group, region }) => ({
        content: [{ type: "text", text: `[PLACEHOLDER] To create a resource group: az group create --name ${resource_group} --location ${region}` }]
      })
    );

    // Step 5: App Service Plan Creation
    this.server.tool(
      "create_app_service_plan",
      "Guides user to create an Azure App Service Plan.",
      {
        plan_name: z.string().describe("App Service Plan name."),
        resource_group: z.string().describe("Resource group to use"),
        sku: z.string().describe("SKU (e.g., F1, B1, P1V2).")
      },
      async ({ plan_name, resource_group, sku }) => ({
        content: [{ type: "text", text: `[PLACEHOLDER] Command: az appservice plan create --name ${plan_name} --resource-group ${resource_group} --sku ${sku}` }]
      })
    );

    // Step 6: Web App Creation
    this.server.tool(
      "create_web_app",
      "Assist user in creating the actual web app in Azure.",
      {
        app_name: z.string(),
        resource_group: z.string(),
        plan_name: z.string(),
        runtime: z.string()
      },
      async ({ app_name, resource_group, plan_name, runtime }) => ({
        content: [{ type: "text", text: `[PLACEHOLDER] Command: az webapp create --name ${app_name} --resource-group ${resource_group} --plan ${plan_name} --runtime ${runtime}` }]
      })
    );

    // Step 7: Deploy Code
    this.server.tool(
      "deploy_code",
      "Guide user through deploying their app code.",
      {
        app_name: z.string(),
        resource_group: z.string(),
        source_dir: z.string().describe("Path to source code folder.")
      },
      async ({ app_name, resource_group, source_dir }) => ({
        content: [{ type: "text", text: `[PLACEHOLDER] Use: az webapp deploy --resource-group ${resource_group} --name ${app_name} --src-path ${source_dir}` }]
      })
    );

    // Step 8: Validate Deployment
    this.server.tool(
      "validate_deployment",
      "Suggests a way to verify the deployment was successful.",
      {
        app_name: z.string(),
        resource_group: z.string(),
      },
      async ({ app_name, resource_group }) => ({
        content: [{ type: "text", text: `[PLACEHOLDER] To check deployment, browse: https://${app_name}.azurewebsites.net/ or use: az webapp show --name ${app_name} --resource-group ${resource_group}` }]
      })
    );

    // Step 9: Next Steps
    this.server.tool(
      "next_steps",
      "Suggests next steps (setting env vars, scaling, CI/CD, etc.).",
      {},
      async () => ({
        content: [{ type: "text", text: "[PLACEHOLDER] Explore additional configuration options, environment variables, scaling. See Azure docs: ..." }]
      })
    );
  }
}

export default {
  fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(request.url);

    // SSE transport (for maximum interoperability)
    if (url.pathname === "/sse" || url.pathname === "/sse/message") {
      return AzureAppServiceMCP.serveSSE("/sse").fetch(request, env, ctx);
    }

    // Streamable HTTP (newer MCP transport)
    if (url.pathname === "/mcp") {
      return AzureAppServiceMCP.serve("/mcp").fetch(request, env, ctx);
    }

    return new Response("Not found", { status: 404 });
  }
};
