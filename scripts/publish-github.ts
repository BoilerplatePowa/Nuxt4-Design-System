#!/usr/bin/env tsx

/**
 * GitHub Packages Publishing Script
 * Simplified script for publishing to GitHub Packages registry
 */

import { execSync } from 'child_process'
import { readFileSync } from 'fs'

interface PublishConfig {
  registry: string
  scope: string
  packageName: string
  version: string
}

class GitHubPublisher {
  private config: PublishConfig
  
  constructor() {
    const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
    
    this.config = {
      registry: 'https://npm.pkg.github.com',
      scope: '@boilerplatepowa',
      packageName: packageJson.name,
      version: packageJson.version
    }
  }
  
  /**
   * Publish package to GitHub Packages
   */
  async publish(): Promise<boolean> {
    console.log(`📦 Publishing ${this.config.packageName}@${this.config.version} to GitHub Packages...`)
    
    try {
      // Pre-publish validation
      await this.validatePackage()
      
      // Build package
      await this.buildPackage()
      
      // Publish to GitHub Packages
      await this.publishToGitHub()
      
      console.log(`✅ Successfully published ${this.config.packageName}@${this.config.version}`)
      return true
      
    } catch (error) {
      console.error(`❌ Failed to publish:`, error)
      return false
    }
  }
  
  /**
   * Validate package before publishing
   */
  private async validatePackage(): Promise<void> {
    console.log('🔍 Validating package...')
    
    // Check if package.json exists and is valid
    try {
      const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
      
      if (!packageJson.name || !packageJson.version) {
        throw new Error('Package name or version missing')
      }
      
      if (!packageJson.name.startsWith(this.config.scope)) {
        throw new Error(`Package name must start with ${this.config.scope}`)
      }
      
    } catch (error) {
      throw new Error(`Package validation failed: ${error.message}`)
    }
    
    // Run tests
    try {
      console.log('🧪 Running tests...')
      execSync('npm run test:ci', { stdio: 'inherit' })
    } catch (error) {
      throw new Error('Tests failed - cannot publish')
    }
    
    // Security audit
    try {
      console.log('🔒 Running security audit...')
      execSync('npm run security:audit', { stdio: 'inherit' })
    } catch (error) {
      console.warn('⚠️ Security audit found issues, but continuing...')
    }
  }
  
  /**
   * Build the package
   */
  private async buildPackage(): Promise<void> {
    console.log('🔨 Building package...')
    
    try {
      execSync('npm run build', { stdio: 'inherit' })
    } catch (error) {
      throw new Error('Build failed')
    }
  }
  
  /**
   * Publish to GitHub Packages
   */
  private async publishToGitHub(): Promise<void> {
    console.log('📤 Publishing to GitHub Packages...')
    
    try {
      execSync(`npm publish --registry=${this.config.registry}`, {
        stdio: 'inherit',
        env: {
          ...process.env,
          NODE_AUTH_TOKEN: process.env.GITHUB_TOKEN
        }
      })
    } catch (error) {
      throw new Error('Publishing to GitHub Packages failed')
    }
  }
  
  /**
   * Get package info
   */
  getPackageInfo(): PublishConfig {
    return { ...this.config }
  }
}

// CLI interface
async function main() {
  const publisher = new GitHubPublisher()
  
  console.log('📋 Package Info:')
  console.log(`  Name: ${publisher.getPackageInfo().packageName}`)
  console.log(`  Version: ${publisher.getPackageInfo().version}`)
  console.log(`  Registry: ${publisher.getPackageInfo().registry}`)
  console.log('')
  
  const success = await publisher.publish()
  
  if (success) {
    console.log('')
    console.log('🎉 Package published successfully!')
    console.log(`📦 Install with: npm install ${publisher.getPackageInfo().packageName}`)
    console.log(`🔗 View at: https://github.com/BoilerplatePowa/Nuxt4-Design-System/packages`)
  }
  
  process.exit(success ? 0 : 1)
}

if (require.main === module) {
  main().catch(console.error)
}

export { GitHubPublisher }
