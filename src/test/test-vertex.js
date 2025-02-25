// Simple test script to verify token-efficient tool use
require('dotenv').config();

// Import the VertexHandler class
const { VertexHandler } = require('../api/providers/vertex');

async function runTest() {
  console.log("Testing token-efficient tool use with Vertex provider");
  console.log("===================================================");

  // Create options for the Vertex handler with Claude 3.7 Sonnet (has token-efficient tool use)
  const options = {
    apiModelId: "claude-3-7-sonnet@20250219",
    vertexProjectId: process.env.VERTEX_PROJECT_ID,
    vertexRegion: process.env.VERTEX_REGION || "europe-west1",
  };

  // Create a test message
  const systemPrompt = "You are a helpful assistant that can use tools to accomplish tasks.";
  const messages = [
    {
      role: "user",
      content: "Please list the files in the current directory and then read the content of package.json",
    },
  ];

  // Create the Vertex handler
  const vertexHandler = new VertexHandler(options);

  // Test with Claude 3.7 Sonnet (should use token-efficient tool use)
  console.log("\nRunning test with Claude 3.7 Sonnet...");
  try {
    const stream = vertexHandler.createMessage(systemPrompt, messages);
    
    // Just consume the stream to trigger the API call
    for await (const chunk of stream) {
      // We don't need to do anything with the chunks
    }
    
    console.log("Completed test with Claude 3.7 Sonnet");
  } catch (error) {
    console.error("Error testing with Claude 3.7 Sonnet:", error);
  }

  // Now test with Claude 3.5 Sonnet (doesn't have token-efficient tool use)
  console.log("\nRunning test with Claude 3.5 Sonnet...");
  
  // Create a new handler with Claude 3.5 Sonnet
  const optionsWithoutFeature = {
    apiModelId: "claude-3-5-sonnet-v2@20241022",
    vertexProjectId: process.env.VERTEX_PROJECT_ID,
    vertexRegion: process.env.VERTEX_REGION || "europe-west1",
  };
  
  const vertexHandlerWithoutFeature = new VertexHandler(optionsWithoutFeature);
  
  try {
    const stream = vertexHandlerWithoutFeature.createMessage(systemPrompt, messages);
    
    // Just consume the stream to trigger the API call
    for await (const chunk of stream) {
      // We don't need to do anything with the chunks
    }
    
    console.log("Completed test with Claude 3.5 Sonnet");
  } catch (error) {
    console.error("Error testing with Claude 3.5 Sonnet:", error);
  }

  console.log("\nTest completed. Check the debug logs above to verify that the token-efficient tool use feature is working correctly.");
}

// Run the test
runTest().catch(console.error);
