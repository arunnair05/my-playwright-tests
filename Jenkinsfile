pipeline {
    agent {
        docker { 
            image 'mcr.microsoft.com/playwright/java:v1.57.0-noble'
            args '-u root:root --env HOME=/root --ipc=host'
        }
    }

    // We no longer need the 'tools' section for Allure since we'll use npx
    
    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm ci --unsafe-perm' 
            }
        }
        stage('Run Playwright Tests') {
            steps {
                // This generates the 'allure-results' folder
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            script {
                // Generate the report using the local npm package
                // This stays INSIDE the container where the files actually are
                sh 'npx allure generate allure-results --clean -o allure-report'
            }

            // Use publishHTML to show the generated Allure report
            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'allure-report',
                reportFiles: 'index.html',
                reportName: 'Allure Dashboard'
            ])

            // Clean up to save your 10GB GCP disk
            cleanWs()
        }
    }
}