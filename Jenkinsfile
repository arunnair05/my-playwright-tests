pipeline {
    agent {
        docker { 
            image 'mcr.microsoft.com/playwright:v1.57.0-noble'
            args '-u root:root --env HOME=/root --ipc=host'
        }
    }

    stages {
        stage('Install System Dependencies') {
            steps {
                // This installs Java inside the container to fix the Allure error
                sh 'apt-get update && apt-get install -y default-jre'
            }
        }

        stage('Install Node Dependencies') {
            steps {
                sh 'npm ci --cache .npm-cache --unsafe-perm' 
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            script {
                // Generates the report inside the container using the JRE we just installed
                sh 'npx allure generate allure-results --clean -o allure-report'
            }

            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'allure-report',
                reportFiles: 'index.html',
                reportName: 'Allure Dashboard'
            ])

            // Essential for your GCP VM disk health
            cleanWs()
        }
    }
}