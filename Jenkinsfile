pipeline {
    agent {
        docker { 
            image 'mcr.microsoft.com/playwright:v1.57.0-noble'
            args '-u root:root --env HOME=/root --ipc=host'
        }
    }

    tools {
        // Must match the name in Global Tool Configuration exactly
        allure 'Allure 2.36.0' 
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci --cache .npm-cache --unsafe-perm' 
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // Run tests inside the Docker container
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            // Use a script block to run Allure on the host (GCP VM) 
            // instead of inside the Playwright container.
            script {
                node('built-in') {
                    allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
                }
            }

            // Publish the standard HTML report as a backup
            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
            
            // Critical for your 10GB GCP Disk: 
            // Clears the workspace after the build to save space.
            cleanWs()
        }
    }
}