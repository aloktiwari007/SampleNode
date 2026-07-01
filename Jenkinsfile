pipeline {

    agent any

    environment {

        DEPLOY_DIR = "d:\\testapplication"

    }

    stages {

        stage('Checkout') {

            steps {

                checkout scm

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

                bat """
                cd %DEPLOY_DIR%
                pm2 delete || exit /b 0
                pm2 start ecosystem.config.js
                pm2 save
                """
            }

        }

    }

}
