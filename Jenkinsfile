pipeline {
    agent any
        tools {
          nodejs 'nodejs 22.19.0'
        }

    triggers {
        githubPush() // Trigger build on GitHub push
    }
// Build Stages
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
            steps {
                withCredentials([string(credentialsId: 'render-deploy-hook', variable: 'DEPLOY_HOOK')]) {
                    sh 'curl -X POST $DEPLOY_HOOK'
                }
            }
        }
    }
}
//     post {
//         always {
//             echo 'Notification stage executed.'
//         }
//         // Success deployment notification
//         success {
//             emailext(
//                 to: 'malangavic@gmail.com',
//                 subject: "Build: ${currentBuild.fullDisplayName} succeeded!\n View deployed app: https://gallery-eqsl.onrender.com",
//                 body: "The deployment was successful. Check the details at ${env.BUILD_URL}"
//             )

//             slackSend(
//                 channel: '#paul_ip1',
//                 tokenCredentialId: 'slack-webhook',
//                 color: 'good',
//                 message: "Build: ${currentBuild.fullDisplayName} succeeded!\n View deployed app: https://gallery-7io0.onrender.com"
//             )

//         }
//         // Failure deployment notification
//         failure {
//             // email notification
//             emailext(
//                 to: 'pmc.ac.ke@gmail.com',
//                 subject: "Failed Deployment: ${currentBuild.fullDisplayName}",
//                 body: "The deployment failed. Check the details at ${env.BUILD_URL}"
//             )
//             // slack notification
//             slackSend(
//                 channel: '#paul_ip1',
//                 tokenCredentialId: 'slack-webhook',
//                 color: 'danger',
//                 message: "FAILURE: ${env.JOB_NAME} #${env.BUILD_NUMBER} failed.\n${env.BUILD_URL}"
//             )

//         }
//     }

// }
