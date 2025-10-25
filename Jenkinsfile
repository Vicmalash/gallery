pipeline {
    agent any

    tools {
        nodejs 'nodejs 22.19.0'
    }

    triggers {
        githubPush() // Trigger build on GitHub push
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/Vicmalash/gallery.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Running Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Deploy to Render') {
            when {
                expression { currentBuild.currentResult == 'SUCCESS' }
            }
            steps {
                withCredentials([string(credentialsId: 'render-deploy-hook', variable: 'DEPLOY_HOOK')]) {
                    echo "Triggering deployment to Render..."
                    sh 'curl -X POST $DEPLOY_HOOK'
                }
            }
        }
    }

    post {
        failure {
            emailext(
                to: 'victor.malangah@gmail.com',
                subject: "❌ Build Failed: ${currentBuild.fullDisplayName}",
                body: """
                    <p>Unfortunately, your Jenkins build has <b>failed</b>.</p>
                    <p><b>Build:</b> ${currentBuild.fullDisplayName}</p>
                    <p><b>Project:</b> Gallery App</p>
                    <p><b>Check logs here:</b> <a href='${env.BUILD_URL}'>${env.BUILD_URL}</a></p>
                """,
                mimeType: 'text/html'
            )
        }

        success {
            withCredentials([string(credentialsId: 'vic-webhook', variable: 'SLACK_URL')]) {
                sh """
                curl -X POST -H 'Content-type: application/json' \
                --data '{
                    "text": ":rocket: *Build #${BUILD_ID}* succeeded!\\nDeployed successfully to Render: https://gallery-eqsl.onrender.com"
                }' $SLACK_URL
                """
            }
        }
    }
}
