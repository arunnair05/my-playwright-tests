pipeline {
    agent {
        // This uses the official Microsoft Playwright image
        docker { 
            image 'mcr.microsoft.com/playwright:v1.57.0-noble'
            // Keep these args to fix the npm permission (EACCES) issues
            args '-u root:root --env HOME=/root --ipc=host'
        }
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
            // This saves your test results even if the tests fail
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: false,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
        }
    }
}