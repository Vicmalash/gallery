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
        RENDER_URL = "https://my-node-gallery.onrender.com"
        JENKINS_JOB = "http://localhost:8080/job/Gallery-CI-Pipeline/${env.BUILD_ID}/"
    }

    stages {
        stage('Cloning repo') {
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

        stage('Notify Slack - Success') {
            steps {
                script {
                    sh """
                    curl -X POST -H 'Content-type: application/json' \
                    --data '{ "text": "✅ Build ${env.BUILD_ID} deployed successfully!\\n:link: ${RENDER_URL}\\n Jenkins: ${JENKINS_JOB}" }' \
                    $SLACK_WEBHOOK
                    """
                }
            }
        }
    }

    post {
        failure {
            script {
                sh """
                curl -X POST -H 'Content-type: application/json' \
                --data '{ "text": "❌ Build ${env.BUILD_ID} failed!\\nCheck Jenkins: ${JENKINS_JOB}" }' \
                $SLACK_WEBHOOK
                """
            }
        }
    }
}
