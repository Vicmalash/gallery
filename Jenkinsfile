pipeline {
    agent any

    tools {
        nodejs "node22"
    }

    triggers {
        githubPush()
    }

    stages {
        stage('Cloning repo...') {
            steps {
                git branch: 'master', url: 'https://github.com/Vicmalash/gallery.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Deploy to Render') {
            steps {
                withCredentials([string(credentialsId: 'devops', variable: 'DEPLOY_TO_RENDER_HOOK')]) {
                    sh 'curl -X POST $DEPLOY_TO_RENDER_HOOK'
                }
            }
        }

        stage('Notify') {
            steps {
                echo " Code built and deployed successfully!"
            }
        }
    }
}

