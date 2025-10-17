# Contributing to Ani AI

Thank you for your interest in contributing to Ani AI! We welcome contributions from the community to help improve this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Coding Guidelines](#coding-guidelines)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally
3. Set up the development environment (see [Development Setup](#development-setup))
4. Create a new branch for your contribution
5. Make your changes
6. Test your changes thoroughly
7. Submit a pull request

## How to Contribute

There are many ways to contribute to Ani AI:

- **Report bugs**: If you find a bug, please open an issue with details
- **Suggest features**: Have an idea? Open an issue to discuss it
- **Improve documentation**: Help make our docs better
- **Write code**: Fix bugs or implement new features
- **Review pull requests**: Help review and test others' contributions

## Development Setup

### Prerequisites

- Node.js >= 18
- npm or yarn
- React Native development environment set up ([guide](https://reactnative.dev/docs/set-up-your-environment))
- For iOS: Xcode and CocoaPods
- For Android: Android Studio and SDK

### Installation

1. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ani-ai.git
   cd ani-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   # For iOS, also install pods
   cd ios && bundle install && bundle exec pod install && cd ..
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add your API keys:
     ```
     GEMINI_API_KEY=your_gemini_api_key
     ELEVENLABS_API_KEY=your_elevenlabs_api_key
     ELEVENLABS_VOICE_ID=your_voice_id
     ```

4. Run the app:
   ```bash
   # For Android
   npm run android
   
   # For iOS
   npm run ios
   ```

## Coding Guidelines

- Follow the existing code style and conventions
- Use TypeScript for type safety
- Write clean, readable, and maintainable code
- Add comments for complex logic
- Ensure your code passes linting: `npm run lint`
- Write tests for new features when applicable

### Code Style

- Use 2 spaces for indentation
- Use single quotes for strings
- Add trailing commas in multi-line objects/arrays
- Follow ESLint and Prettier configurations

## Commit Guidelines

We follow conventional commit messages for clarity:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Example:
```
feat: add voice playback controls
fix: resolve issue with chat history
docs: update API configuration instructions
```

## Pull Request Process

1. **Create a branch**: Use a descriptive branch name
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**: Follow the coding guidelines

3. **Test thoroughly**: Ensure your changes work as expected
   - Run linter: `npm run lint`
   - Run tests: `npm test`
   - Test on both iOS and Android if possible

4. **Commit your changes**: Use conventional commit messages

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**:
   - Provide a clear title and description
   - Reference any related issues
   - Include screenshots/videos for UI changes
   - List what you've tested

7. **Address feedback**: Be responsive to review comments

8. **Wait for approval**: A maintainer will review and merge your PR

## Reporting Bugs

When reporting bugs, please include:

- **Description**: Clear description of the bug
- **Steps to Reproduce**: Detailed steps to reproduce the issue
- **Expected Behavior**: What you expected to happen
- **Actual Behavior**: What actually happened
- **Environment**:
  - OS (iOS/Android version)
  - Device/Emulator
  - App version
  - Node version
- **Screenshots/Logs**: If applicable
- **Additional Context**: Any other relevant information

## Suggesting Enhancements

When suggesting enhancements:

- **Use case**: Explain why this enhancement would be useful
- **Describe the solution**: Clearly describe your proposed solution
- **Alternatives**: List any alternative solutions you've considered
- **Additional context**: Add any other context, mockups, or examples

## Questions?

If you have questions about contributing, feel free to:

- Open an issue with the `question` label
- Reach out to the maintainers

Thank you for contributing to Ani AI! 🎉
