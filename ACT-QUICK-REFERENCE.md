# Act Quick Reference Guide

## Common Commands

### List Workflows
```bash
npm run act:list
```
Shows all available workflows and jobs.

### Run Test Suite
```bash
npm run act:test
```
Runs: unit-tests, integration-tests, component-tests, performance-tests

### Run Quality Gates
```bash
npm run act:quality
```
Runs: lint-and-format, security, bundle-analysis

### Run All Workflows
```bash
npm run act:all
```
Runs all workflows defined in `.github/workflows/`

### Dry Run
```bash
npm run act:dry-run
```
Shows what would run without executing.

### Verbose Output
```bash
npm run act:verbose
```
Runs with detailed debug output.

## Individual Job Execution

```bash
# Run specific job
act -j unit-tests

# Run multiple specific jobs
act -j lint-and-format -j security

# Skip specific jobs
act --skip-job security
```

## Troubleshooting

### Check Docker Status
```bash
docker --version
docker ps
```

### Test Docker
```bash
docker run hello-world
```

### View Act Version
```bash
act --version
```

### Clear Docker Cache
```bash
docker system prune -a
```

## Configuration Files

- `.actrc` - Main act configuration
- `.secrets` - Secrets for local testing (not committed)
- `.secrets.local` - Local secrets override
- `.actignore` - Files to ignore

## Environment Variables

Set in `.actrc`:
- `NODE_VERSION=22.20.0`
- `NPM_VERSION=10.9.0`

## Platform Configuration

Default platform: `catthehacker/ubuntu:act-latest`
Architecture: `linux/amd64` (for M-series compatibility)

## Common Issues & Quick Fixes

| Issue | Quick Fix |
|-------|-----------|
| Architecture warning | Already fixed in `.actrc` with `--container-architecture linux/amd64` |
| Port binding error | Already fixed in `.actrc` with `--artifact-server-path=""` |
| Docker not running | Start Docker Desktop |
| Out of memory | Increase Docker memory in Docker Desktop settings |
| Secrets not found | Create `.secrets` file or use `--secret-file` flag |

## Performance Tips

1. Use `--bind` for faster file operations (already enabled)
2. Use `--cache` for dependency caching
3. Run specific jobs instead of all workflows
4. Use dry run to test before executing

## Best Practices

1. Always run `act:dry-run` first
2. Test incrementally (specific jobs before all)
3. Monitor Docker resources
4. Keep secrets secure (never commit)
5. Update act and Docker regularly

## Workflow Files

Located in `.github/workflows/`:
- `testing.yml` - Test suite workflows
- `quality-gates.yml` - Quality checks
- `pr-checks.yml` - PR validation
- `release.yml` - Release automation
- `storybook-deploy.yml` - Storybook deployment

## Getting Help

```bash
# Act help
act --help

# Specific command help
act -j --help

# List all available flags
act --help-all
```

## Resources

- [Act Documentation](https://github.com/nektos/act)
- [Docker Documentation](https://docs.docker.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- Project-specific: `ACT-USAGE.md`

