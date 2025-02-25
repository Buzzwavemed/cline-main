import * as dotenv from "dotenv";
import { VertexHandler } from "../api/providers/vertex";
import { Anthropic } from "@anthropic-ai/sdk";
import { ApiHandlerOptions } from "../shared/api";

// Create a subclass of VertexHandler that doesn't send the beta header
class VertexHandlerWithoutBetaHeader extends VertexHandler {
  constructor(options: ApiHandlerOptions) {
    super(options);
  }

  // Override the getModel method to return a model that doesn't support token-efficient tool use
  override getModel() {
    const model = super.getModel();
    // Create a new model info object without the supportsTokenEfficientToolUse property
    const newModelInfo = { ...model.info };
    newModelInfo.supportsTokenEfficientToolUse = false;
    return { id: model.id, info: newModelInfo };
  }
}

// Load environment variables from .env file
dotenv.config();

// Main test function
async function runTest() {
    console.log("Testing token-efficient tool use with Vertex provider");
    console.log("===================================================");

    // Create options for the Vertex handler
    const options = {
      apiModelId: "claude-3-7-sonnet@20250219",
      vertexProjectId: process.env.VERTEX_PROJECT_ID,
      vertexRegion: process.env.VERTEX_REGION || "europe-west1",
    };

    // Create a test message with a more complex prompt that involves both tool use and computer use
    const systemPrompt = "You are a helpful assistant that can use tools and computer use to accomplish tasks.";
    const messages: Anthropic.Messages.MessageParam[] = [
      {
        role: "user" as const,
        content: "I need you to help me with a complex analysis task that requires both tool use and computer use:\n\n" +
                 "1. First, use computer use to write a Python script that analyzes the structure of a JSON file\n" +
                 "2. Then list all files in the current directory\n" +
                 "3. Read the package.json file\n" +
                 "4. Use computer use to write a JavaScript function that extracts all dependencies from the package.json\n" +
                 "5. Search for all TypeScript files that contain 'token'\n" +
                 "6. Use computer use to write a bash script that counts the number of files in each directory\n" +
                 "7. Create a detailed summary of your findings\n\n" +
                 "This complex task will require multiple tool uses and computer use operations, which should help demonstrate the token-efficient tool use feature.",
      },
    ];

    // Create two instances of the Vertex handler
    // One with token-efficient tool use enabled and one without
    const vertexHandler = new VertexHandler(options);

    // Test with token-efficient tool use (using our implementation)
    console.log("\nRunning test with token-efficient tool use...");
    let inputTokensWithFeature = 0;
    let outputTokensWithFeature = 0;

    try {
      const streamWithFeature = vertexHandler.createMessage(systemPrompt, messages);
      
      for await (const chunk of streamWithFeature) {
        if (chunk.type === "usage") {
          inputTokensWithFeature += chunk.inputTokens;
          outputTokensWithFeature += chunk.outputTokens;
        }
      }
      
      console.log("Completed test with token-efficient tool use");
      console.log(`Input tokens: ${inputTokensWithFeature}`);
      console.log(`Output tokens: ${outputTokensWithFeature}`);
      console.log(`Total tokens: ${inputTokensWithFeature + outputTokensWithFeature}`);
    } catch (error) {
      console.error("Error testing with token-efficient tool use:", error);
    }

    // Now run the same test but with a modified version of the VertexHandler that doesn't send the beta header
    console.log("\nRunning test without token-efficient tool use...");
    
    // Create a new handler with the same model but using our subclass that doesn't send the beta header
    const optionsWithoutFeature = {
      apiModelId: "claude-3-7-sonnet@20250219", // Same model as before
      vertexProjectId: process.env.VERTEX_PROJECT_ID,
      vertexRegion: process.env.VERTEX_REGION || "europe-west1",
    };
    
    const vertexHandlerWithoutFeature = new VertexHandlerWithoutBetaHeader(optionsWithoutFeature);
    
    let inputTokensWithoutFeature = 0;
    let outputTokensWithoutFeature = 0;

    try {
      const streamWithoutFeature = vertexHandlerWithoutFeature.createMessage(systemPrompt, messages);
      
      for await (const chunk of streamWithoutFeature) {
        if (chunk.type === "usage") {
          inputTokensWithoutFeature += chunk.inputTokens;
          outputTokensWithoutFeature += chunk.outputTokens;
        }
      }
      
      console.log("Completed test without token-efficient tool use");
      console.log(`Input tokens: ${inputTokensWithoutFeature}`);
      console.log(`Output tokens: ${outputTokensWithoutFeature}`);
      console.log(`Total tokens: ${inputTokensWithoutFeature + outputTokensWithoutFeature}`);
    } catch (error) {
      console.error("Error testing without token-efficient tool use:", error);
    }

    // Compare results
    const totalWithFeature = inputTokensWithFeature + outputTokensWithFeature;
    const totalWithoutFeature = inputTokensWithoutFeature + outputTokensWithoutFeature;
    const tokenSavings = totalWithoutFeature - totalWithFeature;
    const percentSavings = (tokenSavings / totalWithoutFeature) * 100;

    console.log("\nToken Savings Analysis:");
    console.log(`Token savings: ${tokenSavings} tokens`);
    console.log(`Percentage savings: ${percentSavings.toFixed(2)}%`);

    if (tokenSavings > 0) {
      console.log("\n✅ Token-efficient tool use is working correctly!");
      console.log(`The feature saved ${tokenSavings} tokens (${percentSavings.toFixed(2)}% reduction).`);
    } else {
      console.log("\n❌ Token-efficient tool use does not appear to be working.");
      console.log("There was no reduction in token usage with the feature enabled.");
      console.log("This could be because:");
      console.log("1. The beta header is not being sent correctly");
      console.log("2. The model doesn't support the feature yet");
      console.log("3. The test case doesn't involve enough tool use to show a difference");
    }
}

// Run the test
runTest().catch(console.error);
