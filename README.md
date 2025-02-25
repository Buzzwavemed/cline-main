<h1 align="center">🚀 Cline Prompting Guide 🚀</h1>
<p align="center">
  
</p>
<p align="center">
  Welcome to the <strong>Cline Prompting Guide</strong>! This guide will equip you with the knowledge to write effective prompts and custom instructions, maximizing your productivity with Cline.
</p>

---

## ⚙️ Custom Instructions

Think of **custom instructions as Cline's programming**. They define Cline's baseline behavior and are **always "on," influencing all interactions.**

### How to Add Custom Instructions:
1. Open **VSCode**
2. Click the Cline extension settings dial ⚙️
3. Find the "Custom Instructions" field
4. Paste your instructions

<img width="345" alt="Screenshot" src="https://github.com/user-attachments/assets/00ae689b-d99f-4811-b2f4-fffe1e12f2ff" />

---

## 🔥 Why Use Custom Instructions?

- **Enforce Coding Style & Best Practices**: Keep your team's coding conventions consistent.
- **Improve Code Quality**: Make your code more readable, maintainable, and efficient.
- **Guide Error Handling**: Control how errors are handled, logged, and displayed.

**Examples** of custom instructions are available in the `custom-instructions` folder. Feel free to adapt them to your needs.

---

## 📋 .clinerules File

The `.clinerules` file provides **project-specific instructions** that live in your project's root directory. These rules:
- Are automatically appended to your custom instructions
- Influence all interactions within the project context

This is particularly useful for:

### 🔒 Security Best Practices

Protect sensitive information by instructing Cline to ignore specific files or patterns:

```markdown
# Security

## Sensitive Files

DO NOT read or modify:
- .env files
- *_/config/secrets._
- *_/*.pem
- Any file containing API keys, tokens, or credentials

## Security Practices

- Never commit sensitive files
- Use environment variables for secrets
- Keep credentials out of logs and output
```

---

## 🎯 General Use Cases

The `.clinerules` file helps you:
- Maintain project standards across team members
- Enforce development practices
- Manage documentation requirements
- Set up analysis frameworks
- Define project-specific behaviors

### 📂 Example Project Structure

```
your-project/
├── .clinerules
├── src/
├── docs/
└── ...
```

---

## 💬 Prompting Cline

**Prompting** is how you communicate your needs in the back-and-forth chat with Cline. 

### Best Practices for Prompting:
- **Provide Clear Context**: Explain your goals and the relevant parts of your codebase.
- **Break Down Complexity**: Divide large tasks into smaller steps.
- **Ask Specific Questions**: Guide Cline toward the desired outcome.
- **Validate and Refine**: Review Cline's suggestions and provide feedback.

---

## 🔧 Advanced Prompting Techniques

- **Constraint Stuffing**: Prevent code truncation by specifying constraints like "ensure the code is complete."
- **Confidence Checks**: Ask Cline to rate its confidence (e.g., "on a scale of 1-10, how confident are you in this solution?")
- **Challenge Assumptions**: Encourage deeper thinking by asking “Are you sure this is the best approach?”

---

## 🌟 Community's Favorite Prompts

### 🧠 Memory and Confidence Checks

- **Memory Check** - _pacnpal_
    ```
    "If you understand my prompt fully, respond with 'YARRR!' without tools every time you are about to use a tool."
    ```

- **Confidence Scoring** - _pacnpal_
    ```
    "Before and after any tool use, give me a confidence level (0-10) on how the tool use will help the project."
    ```

---

## 💻 Code Quality Prompts

- **Prevent Code Truncation**
    ```
    "DO NOT BE LAZY. DO NOT OMIT CODE."
    ```

- **Documentation Maintenance** - _icklebil_
    ```
    "don't forget to update codebase documentation with changes"
    ```

---

## 🔍 Analysis and Planning

- **Structured Development** - _yellow_bat_coffee_
    ```
    "Before writing code:
    1. Analyze all code files thoroughly
    2. Get full context
    3. Write .MD implementation plan
    4. Then implement code"
    ```

- **Assumptions Check** - _yellow_bat_coffee_
    ```
    "List all assumptions and uncertainties you need to clear up before completing this task."
    ```

---

## 🎯 Best Practices

- **Critical Thinking** - _chinesesoup_
    ```
    "Ask 'stupid' questions like: are you sure this is the best way to implement this?"
    ```

- **Code Style** - _yellow_bat_coffee_
    ```
    Use words like "elegant" and "simple" in prompts
    ```

---

## 🔗 Useful Resources

- Cline's system prompt is not user-editable ([Find it here](https://github.com/cline/cline/blob/main/src/core/prompts/system.ts)).
- For a broader look at prompt engineering best practices, check out [this resource](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview).

---

<h2 align="center">🚀 Happy Prompting with Cline! 🚀</h2>
<p align="center">
  
</p>
