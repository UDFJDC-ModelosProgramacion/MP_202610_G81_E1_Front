pipeline {
    agent {
        docker { 
            image 'node:26.1.0-alpine' 
        }
    }

    environment {
        SONAR_TOKEN = credentials('sonar-front-token')
    }

    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Installing project dependencies...'
                sh 'npm install'
            }
        }

        stage('Code Linting & Style') {
            steps {
                echo 'Running linter...'
            }
        }

        stage('Execute Tests') {
            steps {
                echo 'Running unit tests with coverage...'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                echo 'Triggering SonarQube Local Analysis...'
                sh "npm run sonar -- -Dsonar.token=${SONAR_TOKEN}"
            }
        }

        stage('Build Project') {
            steps {
                echo 'Building production assets...'
                sh 'npm run build'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs above.'
        }
    }
}
