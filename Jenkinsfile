pipeline {
    agent any

    tools {
        nodejs "node"   
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/<your-username>/<your-repo>.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                
                sh 'npm run build || echo "No build script defined"'
            }
        }

        stage('Test') {
            steps {
                
                sh 'echo "No tests available"'
            }
        }

        stage('Deploy to Render') {
            steps {
                
                sh 'https://api.render.com/deploy/srv-d377mnmr433s73egb8r0?key=JxEQhyeSBMs'
            }
        }
    }

    post {
        success {
            echo ' Deployment successful! Visit your Render site.'
        }
        failure {
            echo ' Build failed. Check logs in Jenkins.'
        }
    }
}
