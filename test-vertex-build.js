const esbuild = require("esbuild")
const path = require("path")

async function buildTest() {
  try {
    // Build the test file
    await esbuild.build({
      entryPoints: ["src/test/vertex-token-efficient-tools-test.ts"],
      bundle: true,
      platform: "node",
      outfile: "dist/test-vertex.js",
      external: ["vscode"],
      format: "cjs",
    })
    
    console.log("Build successful! Running test...")
    
    // Run the test
    require("./dist/test-vertex.js")
  } catch (error) {
    console.error("Build failed:", error)
    process.exit(1)
  }
}

buildTest()
