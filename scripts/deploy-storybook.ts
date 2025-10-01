#!/usr/bin/env tsx

/**
 * Storybook Deployment Script
 * Deploys Storybook to GitHub Pages with proper configuration
 */

import { execSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

interface StorybookConfig {
  outputDir: string
  publicPath: string
  baseUrl: string
}

class StorybookDeployer {
  private config: StorybookConfig

  constructor() {
    this.config = {
      outputDir: 'storybook-static',
      publicPath: '/Nuxt4-Design-System/',
      baseUrl: 'https://boilerplatepowa.github.io/Nuxt4-Design-System/',
    }
  }

  /**
   * Deploy Storybook to GitHub Pages
   */
  async deploy(): Promise<boolean> {
    console.log('📚 Deploying Storybook to GitHub Pages...')

    try {
      // Pre-deployment checks
      await this.validateStorybook()

      // Build Storybook
      await this.buildStorybook()

      // Configure for GitHub Pages
      await this.configureForGitHubPages()

      // Deploy to GitHub Pages
      await this.deployToGitHubPages()

      console.log(`✅ Storybook deployed successfully!`)
      console.log(`🔗 URL: ${this.config.baseUrl}`)
      return true
    } catch (error) {
      console.error(`❌ Storybook deployment failed:`, error)
      return false
    }
  }

  /**
   * Validate Storybook configuration
   */
  private async validateStorybook(): Promise<void> {
    console.log('🔍 Validating Storybook configuration...')

    // Check if Storybook config exists
    const configFiles = ['.storybook/main.ts', '.storybook/preview.ts', 'stories/']

    for (const file of configFiles) {
      if (!existsSync(file)) {
        throw new Error(`Storybook configuration missing: ${file}`)
      }
    }

    // Check if stories exist
    try {
      execSync('find stories -name "*.stories.ts" | wc -l', {
        stdio: 'pipe',
      })
    } catch {
      throw new Error('No Storybook stories found')
    }
  }

  /**
   * Build Storybook
   */
  private async buildStorybook(): Promise<void> {
    console.log('🔨 Building Storybook...')

    try {
      execSync('npm run storybook:build', { stdio: 'inherit' })
    } catch {
      throw new Error('Storybook build failed')
    }

    // Verify build output
    if (!existsSync(this.config.outputDir)) {
      throw new Error('Storybook build output not found')
    }
  }

  /**
   * Configure Storybook for GitHub Pages
   */
  private async configureForGitHubPages(): Promise<void> {
    console.log('⚙️ Configuring for GitHub Pages...')

    // Create .nojekyll file to prevent Jekyll processing
    writeFileSync(join(this.config.outputDir, '.nojekyll'), '')

    // Create CNAME file if custom domain is needed
    // writeFileSync(join(this.config.outputDir, 'CNAME'), 'your-domain.com')

    // Update index.html for GitHub Pages
    const indexPath = join(this.config.outputDir, 'index.html')
    if (existsSync(indexPath)) {
      let indexContent = readFileSync(indexPath, 'utf8')

      // Update base path for GitHub Pages
      indexContent = indexContent.replace(
        /<base href="[^"]*">/,
        `<base href="${this.config.publicPath}">`
      )

      writeFileSync(indexPath, indexContent)
    }
  }

  /**
   * Deploy to GitHub Pages
   */
  private async deployToGitHubPages(): Promise<void> {
    console.log('📤 Deploying to GitHub Pages...')

    try {
      execSync(`gh-pages -d ${this.config.outputDir} -t true`, {
        stdio: 'inherit',
        env: {
          ...process.env,
          GH_TOKEN: process.env.GITHUB_TOKEN,
        },
      })
    } catch {
      throw new Error('GitHub Pages deployment failed')
    }
  }

  /**
   * Get deployment info
   */
  getDeploymentInfo(): StorybookConfig {
    return { ...this.config }
  }
}

// CLI interface
async function main() {
  const deployer = new StorybookDeployer()

  console.log('📋 Storybook Deployment Info:')
  console.log(`  Output Directory: ${deployer.getDeploymentInfo().outputDir}`)
  console.log(`  Public Path: ${deployer.getDeploymentInfo().publicPath}`)
  console.log(`  Base URL: ${deployer.getDeploymentInfo().baseUrl}`)
  console.log('')

  const success = await deployer.deploy()

  if (success) {
    console.log('')
    console.log('🎉 Storybook deployment completed!')
    console.log(`📚 View your Storybook at: ${deployer.getDeploymentInfo().baseUrl}`)
    console.log('🔧 Configure GitHub Pages in repository settings if needed')
  }

  process.exit(success ? 0 : 1)
}

if (require.main === module) {
  main().catch(console.error)
}

export { StorybookDeployer }
