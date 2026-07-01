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

}
