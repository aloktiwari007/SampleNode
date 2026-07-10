pipeline {
    agent any

    parameters {
        string(name: 'TICKET_ID', defaultValue: '', description: 'RMS internal ticket id')
        string(name: 'TICKET_NUMBER', defaultValue: '', description: 'RMS ticket number')
        string(name: 'APPLICATION_NAME', defaultValue: '', description: 'Application name')
        string(name: 'BUILD_VERSION', defaultValue: '', description: 'Build/version')
        string(name: 'REPOSITORY_URL', defaultValue: 'https://github.com/aloktiwari007/SampleNode', description: 'Git repository to deploy')
        string(name: 'BRANCH_NAME', defaultValue: 'main', description: 'Branch to deploy')
        string(name: 'ENVIRONMENT', defaultValue: 'DEV', description: 'DEV / QA / UAT / PRODUCTION')
        string(name: 'DEPLOYMENT_TYPE', defaultValue: '', description: 'Backend / Frontend / Database / etc')
    }

    environment {
        DEPLOY_DIR = "d:\\testapplication"
    }

    stages {

        stage('Show Ticket Info') {
            steps {
                echo "Deploying ticket ${params.TICKET_NUMBER} (${params.APPLICATION_NAME})"
                echo "Repository: ${params.REPOSITORY_URL}  Branch: ${params.BRANCH_NAME}"
                echo "Environment: ${params.ENVIRONMENT}  Type: ${params.DEPLOYMENT_TYPE}"
            }
        }

        stage('Checkout') {
            steps {
                script {
                    if (params.REPOSITORY_URL?.trim()) {
                        // Deploy the exact repo/branch the reporter specified on the ticket.
                        git branch: params.BRANCH_NAME,
                            url: params.REPOSITORY_URL
                            // credentialsId: 'your-git-credentials-id'   // uncomment + set for private repos
                    } else {
                        // Fallback: use whatever SCM is configured on the Jenkins job itself.
                        checkout scm
                    }
                }
            }
        }

        stage('Install') {
            steps {
                bat 'npm install'
            }
        }

        stage('Test') {
            steps {
                bat 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                bat """
                if not exist "%DEPLOY_DIR%" mkdir "%DEPLOY_DIR%"
                xcopy /E /Y * "%DEPLOY_DIR%\\"
                """
            }
        }

        stage('Start PM2') {
            steps {
                bat '''
cd /d D:\\testapplication
cmd /c "pm2 stop node-web-app"
cmd /c "pm2 delete node-web-app"
pm2 start app.js --name node-web-app
pm2 save
pm2 list
'''
            }
        }
    }

    post {
        success {
            echo "Deployment succeeded for ${params.TICKET_NUMBER}"
        }
        failure {
            echo "Deployment failed for ${params.TICKET_NUMBER}"
        }
    }
}
