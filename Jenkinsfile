pipeline {
    agent {
        // This uses the official Microsoft Playwright image
        docker { 
            image 'mcr.microsoft.com/playwright:v1.40.0-jammy' 
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
                sh 'npm ci'
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