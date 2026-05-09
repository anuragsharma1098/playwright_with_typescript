# Dev Container Setup Guide

This guide explains how to enable and start working with the Playwright TypeScript project in a dev container.

## Prerequisites

Before you begin, ensure you have:

- **Docker Desktop** installed ([Download](https://www.docker.com/products/docker-desktop))
- **Visual Studio Code** installed ([Download](https://code.visualstudio.com/))
- **VS Code Dev Containers Extension** installed ([Install](vscode:extension/ms-vscode-remote.remote-containers))

## Getting Started

### Option 1: Using VS Code (Recommended)

#### Step 1: Open the Project in VS Code
```bash
code .
```

#### Step 2: Reopen in Container
1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. Type **"Dev Containers: Reopen in Container"**
3. Select the command and press Enter

VS Code will:
- Build the Docker image
- Create and start the container
- Install npm dependencies
- Download Playwright browsers
- Install recommended VS Code extensions

⏳ **First run takes 5-10 minutes** (subsequent runs are faster)

#### Step 3: Verify Setup
Once the container is running, you should see:
- VS Code connected to the container (shown in bottom-left corner)
- All dependencies installed in `node_modules/`
- Playwright browsers ready to use

### Option 2: Using Docker Compose

#### Step 1: Build the Container
```bash
docker-compose -f .devcontainer/docker-compose.yml up -d
```

#### Step 2: Verify it's Running
```bash
docker ps
```
You should see `playwright-dev` container running.

#### Step 3: Access the Container
```bash
docker-compose -f .devcontainer/docker-compose.yml exec playwright bash
```

## Running Tests

Once inside the container, run any of these commands:

### Run All Tests
```bash
npm test
```

### Run Tests with UI Mode
```bash
npm run test:ui
```

### Run Tests in Headed Mode (see browsers)
```bash
npm run test:headed
```

### Debug Tests
```bash
npm run test:debug
```

### View Test Report
```bash
npm run test:report
```

## Development Tasks

### Linting
```bash
npm run lint        # Check for issues
npm run lint:fix    # Auto-fix issues
```

### Code Formatting
```bash
npm run format        # Format all files
npm run format:check  # Check formatting without changes
```

## File Structure

```
.devcontainer/
├── devcontainer.json      # Main dev container configuration
├── Dockerfile             # Custom Docker image definition
├── docker-compose.yml     # Docker Compose configuration
└── README.md             # This file

tests/                    # Test files
test-data/               # Test data (CSV, Excel files)
screenshots/             # Screenshots from test runs
traces/                  # Playwright traces for debugging
test-results/           # Test results
allure-results/         # Allure report data
```

## VS Code Extensions

The following extensions are automatically installed in the container:

- **Playwright Test for VSCode** - Run and debug tests from editor
- **ESLint** - Code quality checking
- **Prettier** - Code formatting
- **GitHub Copilot** - AI coding assistance
- **GitLens** - Git integration

## Troubleshooting

### Container Won't Start
```bash
# Clean up and rebuild
docker system prune -a
docker-compose -f .devcontainer/docker-compose.yml down
docker-compose -f .devcontainer/docker-compose.yml up --build
```

### Playwright Browsers Not Installed
Inside the container, run:
```bash
npx playwright install
```

### Port Already in Use
If port 3000 is already in use, edit `.devcontainer/docker-compose.yml`:
```yaml
ports:
  - "3001:3000"  # Change to different port
```

### SSH/Git Access Issues
The container mounts your SSH keys automatically. If git operations fail:
```bash
# Inside container
ssh-add ~/.ssh/id_rsa
```

### Reopen Locally
To switch back to local development:
1. Press `Ctrl+Shift+P`
2. Type **"Dev Containers: Reopen Folder Locally"**
3. Press Enter

## Tips & Tricks

### Speed Up Rebuilds
Changes to `devcontainer.json` don't require rebuild. Only Dockerfile changes need:
```bash
Dev Containers: Rebuild Container
```

### Run Single Test File
```bash
npx playwright test tests/specific-test.spec.ts
```

### Keep Container Running
The container stays running in VS Code. For docker-compose, it runs indefinitely.

### Check Container Logs
```bash
docker-compose -f .devcontainer/docker-compose.yml logs -f
```

## Environment Variables

Set custom environment variables in `.devcontainer/devcontainer.json`:

```json
"remoteEnv": {
  "NODE_ENV": "development",
  "PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD": "false"
}
```

## Additional Resources

- [VS Code Dev Containers Documentation](https://code.visualstudio.com/docs/devcontainers/containers)
- [Playwright Documentation](https://playwright.dev/)
- [Docker Documentation](https://docs.docker.com/)
- [Project Repository](https://github.com/anuragsharma1098/playwright_with_typescript)

## Next Steps

1. ✅ Open project in VS Code
2. ✅ Reopen in container
3. ✅ Run `npm test` to verify setup
4. ✅ Start writing tests!

---

**Need Help?** Check the troubleshooting section above or refer to the official documentation links.
