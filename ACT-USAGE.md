# Running GitHub Actions Locally with Act

This guide explains how to use [act](https://github.com/nektos/act) to run your GitHub Actions workflows locally for faster development and testing.

## Prerequisites

- Docker installed and running
- act installed (`brew install act` on macOS)

## Important Notes

- All workflows use `npm ci --prefer-online` to ensure fresh package downloads and avoid cache-related sync issues
- This helps prevent package.json and package-lock.json synchronization problems in CI environments

## Quick Start

### 1. List Available Workflows

```bash
npm run act:list
```

### 2. Run All Workflows

```bash
npm run act:all
```

### 3. Run Specific Workflow Jobs

```bash
# Quality gates only
npm run act:quality

# Testing suite only
npm run act:test
```

### 4. Dry Run (See what would run)

```bash
npm run act:dry-run
```

## Available Scripts

| Script                | Description                                                   |
| --------------------- | ------------------------------------------------------------- |
| `npm run act`         | Run act with default configuration                            |
| `npm run act:list`    | List all available workflows and jobs                         |
| `npm run act:quality` | Run quality gates (lint, security, bundle analysis)           |
| `npm run act:test`    | Run testing suite (unit, integration, component, performance) |
| `npm run act:all`     | Run all workflows                                             |
| `npm run act:dry-run` | Show what would run without executing                         |
| `npm run act:verbose` | Run with verbose output for debugging                         |

## Configuration Files

### `.actrc`

Main configuration file for act. Contains:

- Platform mappings for better compatibility
- Environment variables
- Verbose output settings
- Working directory settings

### `.secrets`

Contains secrets for local testing. Copy and add your actual values:

```bash
cp .secrets .secrets.local
# Edit .secrets.local with your actual tokens
```

### `.actignore`

Files and directories to ignore when running act locally.

## Common Use Cases

### 1. Test Quality Gates Locally

```bash
# Run linting and formatting checks
npm run act:quality

# This runs:
# - lint-and-format job
# - security job
# - bundle-analysis job
```

### 2. Test Your Changes Before Pushing

```bash
# Run everything to simulate CI
npm run act:all

# Or run specific jobs
npm run act:test
```

### 3. Debug Workflow Issues

```bash
# See what would run
npm run act:dry-run

# Run with verbose output
npm run act:verbose
```

### 4. Test Individual Jobs

```bash
# Run only linting
act -j lint-and-format

# Run only unit tests
act -j unit-tests

# Run only security scan
act -j security
```

## Troubleshooting

### Docker Issues

If you encounter Docker-related issues:

```bash
# Make sure Docker is running
docker --version

# Test Docker with a simple container
docker run hello-world
```

### Platform Issues

If you encounter platform compatibility issues:

```bash
# Use specific platform
act --platform ubuntu-latest=catthehacker/ubuntu:act-latest

# Or update .actrc with different platform mappings
```

### Permission Issues

If you encounter permission issues:

```bash
# Make sure Docker has proper permissions
sudo chmod +x /usr/local/bin/docker

# Or run with sudo (not recommended for production)
sudo act
```

### Memory Issues

If workflows fail due to memory issues:

```bash
# Increase Docker memory limit in Docker Desktop
# Or use smaller platform images
act --platform ubuntu-latest=catthehacker/ubuntu:act-22.04
```

## Advanced Usage

### Custom Environment Variables

```bash
# Set custom environment variables
act --env CUSTOM_VAR=value

# Use environment file
act --env-file .env.local
```

### Specific Event Triggers

```bash
# Simulate push event
act push

# Simulate pull request event
act pull_request

# Simulate specific branch
act push -e push.json
```

### Skip Jobs

```bash
# Skip specific jobs
act --skip-job security

# Skip multiple jobs
act --skip-job security --skip-job bundle-analysis
```

### Artifact Handling

```bash
# Download artifacts from previous runs
act --artifact-server-path /tmp/artifacts

# Upload artifacts to specific location
act --artifact-server-path /tmp/artifacts --upload-artifact
```

## Integration with Development Workflow

### Pre-commit Hook

Add to `.git/hooks/pre-commit`:

```bash
#!/bin/bash
npm run act:quality
```

### VS Code Integration

Add to `.vscode/tasks.json`:

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Run Quality Gates",
            "type": "shell",
            "command": "npm run act:quality",
            "group": "test"
        },
        {
            "label": "Run All Tests",
            "type": "shell",
            "command": "npm run act:test",
            "group": "test"
        }
    ]
}
```

### CI/CD Integration

Use act in your CI/CD pipeline to test workflows:

```yaml
# .github/workflows/test-workflows.yml
name: Test Workflows
on: [push, pull_request]

jobs:
    test-workflows:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v4
            - name: Test workflows with act
              run: |
                  npm install
                  npm run act:dry-run
```

## Best Practices

1. **Use Dry Run First**: Always run `npm run act:dry-run` before executing workflows
2. **Test Incrementally**: Start with specific jobs before running everything
3. **Monitor Resources**: Watch Docker resource usage during execution
4. **Keep Secrets Secure**: Never commit actual secrets to version control
5. **Update Regularly**: Keep act and Docker images updated for best compatibility

## Performance Tips

1. **Use Bind Mounts**: The `.actrc` file includes `--bind` for better performance
2. **Cache Dependencies**: Use `--cache` flag for better caching
3. **Parallel Execution**: Use `--parallel` for faster execution (when supported)
4. **Resource Limits**: Set appropriate Docker memory limits

## Troubleshooting Common Issues

### Issue: "No workflow found"

**Solution**: Make sure you're in the project root directory and `.github/workflows/` exists.

### Issue: "Docker daemon not running"

**Solution**: Start Docker Desktop or Docker daemon.

### Issue: "Platform not found"

**Solution**: Update `.actrc` with correct platform mappings or use `--platform` flag.

### Issue: "Secrets not found"

**Solution**: Create `.secrets` file with required secrets or use `--secret-file` flag.

### Issue: "Out of memory"

**Solution**: Increase Docker memory limit or use smaller platform images.

## Resources

- [act Documentation](https://github.com/nektos/act)
- [act User Guide](https://github.com/nektos/act#user-guide)
- [Docker Documentation](https://docs.docker.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
