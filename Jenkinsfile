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

        stage('Install Dependenciees') {
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
                    echo "Triggering deployment to Render..."
                    sh 'curl -X POST $DEPLOY_HOOK'
                }
            }
        }
    }
}
    post {
    failure {
        emailext(
            to: 'victor.malangah@gmail.com',
            subject: "Build Failed: ${currentBuild.fullDisplayName}",
            body: """<p>Unfortunately, your Jenkins build has <b>failed</b>.</p>
                     <p><b>Build:</b> ${currentBuild.fullDisplayName}</p>
                     <p><b>Project:</b> Gallery App</p>
                     <p><b>Check logs here:</b> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>""",
            mimeType: 'text/html'
        )

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

 }
}
