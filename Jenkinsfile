pipeline {
    agent any

    tools {
        nodejs "NodeJS 22"
    }

    triggers {
        githubPush()
    }

    environment {
        SLACK_WEBHOOK = credentials('slack-webhook') 
    }

    stages {
        stage('Cloning repo...') {
            steps {
                git branch: 'master', url: 'https://github.com/Vicmalash/gallery.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'node -v'
                sh 'npm -v'
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

        stage('Notify Slack') {
            steps {
                script {
                    slackSend(
                        channel: '#vic',
                        color: 'danger',
                        message: "❌ Build ${env.BUILD_ID} failed!\nCheck Jenkins: http://localhost:8080/job/Gallery-CI-Pipeline/${env.BUILD_ID}/",
                        tokenCredentialId: 'slack-webhook'
                    )
                }
            }
        }
    }

    post {
        failure {
         slackSend(
                channel: '#vic',
                color: 'good',
                message: "✅ Build ${env.BUILD_ID} deployed successfully!",
                tokenCredentialId: 'slack-webhook'
            )
        }
    }
}
