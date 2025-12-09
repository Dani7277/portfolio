// Simple Deployment Script
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

class DeployScript {
    constructor() {
        this.config = {
            sourceDir: '.',
            buildDir: 'dist',
            backupDir: 'backup',
            githubRepo: 'https://github.com/yourusername/portfolio.git',
            branch: 'main'
        };
    }

    // Run build process
    async build() {
        console.log('🔨 Building project...');
        
        try {
            const { build } = require('./build.js');
            await build();
            console.log('✅ Build completed');
            return true;
        } catch (error) {
            console.error('❌ Build failed:', error);
            return false;
        }
    }

    // Create backup of current version
    createBackup() {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupPath = path.join(this.config.backupDir, `backup-${timestamp}`);
        
        if (!fs.existsSync(this.config.backupDir)) {
            fs.mkdirSync(this.config.backupDir, { recursive: true });
        }
        
        if (fs.existsSync(this.config.buildDir)) {
            this.copyFolderSync(this.config.buildDir, backupPath);
            console.log(`📦 Backup created: ${backupPath}`);
        }
        
        return backupPath;
    }

    // Copy folder recursively
    copyFolderSync(source, target) {
        if (!fs.existsSync(target)) {
            fs.mkdirSync(target, { recursive: true });
        }
        
        const files = fs.readdirSync(source);
        
        files.forEach(file => {
            const sourcePath = path.join(source, file);
            const targetPath = path.join(target, file);
            
            if (fs.lstatSync(sourcePath).isDirectory()) {
                this.copyFolderSync(sourcePath, targetPath);
            } else {
                fs.copyFileSync(sourcePath, targetPath);
            }
        });
    }

    // Validate build output
    validateBuild() {
        console.log('🔍 Validating build...');
        
        const requiredFiles = [
            'index.html',
            'styles.min.css',
            'scripts.min.js'
        ];
        
        const missingFiles = requiredFiles.filter(file => 
            !fs.existsSync(path.join(this.config.buildDir, file))
        );
        
        if (missingFiles.length > 0) {
            console.error('❌ Missing build files:', missingFiles);
            return false;
        }
        
        // Check file sizes
        const stats = requiredFiles.map(file => {
            const filePath = path.join(this.config.buildDir, file);
            const stat = fs.statSync(filePath);
            return { file, size: stat.size };
        });
        
        console.log('📊 Build file sizes:');
        stats.forEach(({ file, size }) => {
            console.log(`  ${file}: ${this.formatBytes(size)}`);
        });
        
        // Warn about large files
        const largeFiles = stats.filter(({ size }) => size > 1024 * 1024); // > 1MB
        if (largeFiles.length > 0) {
            console.warn('⚠️  Large files detected:', largeFiles.map(f => f.file));
        }
        
        return true;
    }

    formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    // Generate deployment report
    generateDeploymentReport() {
        const report = {
            timestamp: new Date().toISOString(),
            version: '1.0.0',
            files: [],
            metrics: {}
        };
        
        if (fs.existsSync(this.config.buildDir)) {
            const files = fs.readdirSync(this.config.buildDir);
            
            report.files = files.map(file => {
                const filePath = path.join(this.config.buildDir, file);
                const stat = fs.statSync(filePath);
                return {
                    name: file,
                    size: stat.size,
                    formattedSize: this.formatBytes(stat.size)
                };
            });
            
            report.metrics.totalSize = report.files.reduce((sum, file) => sum + file.size, 0);
            report.metrics.fileCount = report.files.length;
        }
        
        const reportPath = path.join(this.config.buildDir, 'deployment-report.json');
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        
        console.log('📋 Deployment report generated');
        return report;
    }

    // Simulate deployment to GitHub Pages
    async deployToGitHubPages() {
        console.log('🚀 Deploying to GitHub Pages...');
        
        // This is a simulation - in real implementation, you would:
        // 1. Initialize git in dist folder
        // 2. Commit changes
        // 3. Push to gh-pages branch
        
        console.log('✅ Deployment simulation complete');
        console.log('🔗 Your site should be available at: https://yourusername.github.io/portfolio');
        
        return true;
    }

    // Run full deployment pipeline
    async run() {
        console.log('🚀 Starting deployment pipeline...\n');
        
        try {
            // Step 1: Create backup
            this.createBackup();
            
            // Step 2: Build project
            const buildSuccess = await this.build();
            if (!buildSuccess) {
                throw new Error('Build failed');
            }
            
            // Step 3: Validate build
            const validationSuccess = this.validateBuild();
            if (!validationSuccess) {
                throw new Error('Build validation failed');
            }
            
            // Step 4: Generate report
            this.generateDeploymentReport();
            
            // Step 5: Deploy
            await this.deployToGitHubPages();
            
            console.log('\n🎉 Deployment completed successfully!');
            
        } catch (error) {
            console.error('\n❌ Deployment failed:', error.message);
            process.exit(1);
        }
    }
}

// Run if called directly
if (require.main === module) {
    const deployer = new DeployScript();
    deployer.run().catch(console.error);
}

module.exports = DeployScript;