pipeline {
    agent {
        // This uses the official Microsoft Playwright image
        docker { 
            image 'mcr.microsoft.com/playwright:v1.57.0-noble'
            // Keep these args to fix the npm permission (EACCES) issues
            args '-u root:root --env HOME=/root --ipc=host'
        }
    }
    tools {
        // This MUST match the name you gave in Global Tool Configuration
        allure 'Allure 2.36.0' 
    }

    stages {
        stage('Checkout') {
            steps {
                // Jenkins pulls your code automatically, but this ensures we're on Trunk
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci --cache .npm-cache --unsafe-perm ' 
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // 'sh' runs commands in the Linux terminal of the container
                sh 'npx playwright test'
            }
        }
    }

   post {
        always {
            // 1. Generate the Allure Report
            // path: 'allure-results' must match the folder defined in your playwright.config.ts
            allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]

            // 2. Keep your Playwright HTML report as a backup
            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
        }
    }
}