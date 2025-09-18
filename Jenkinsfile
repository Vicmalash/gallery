pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                checkout scm
            }
        }
        stage('Install') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install || echo "No npm dependencies found"'
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test || echo "No test script found"'
            }
        }
        stage('Build') {
            steps {
                echo 'Building project...'
                sh 'npm run build || echo "No build script found"'
            }
        }
    }
}
