pipeline {
    agent any

    tools {
        nodejs "NodeJS 22"   
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

        stage('Build') {
            steps {
                script {
                    // Run build only if defined in package.json
                    def pkg = readJSON file: 'package.json'
                    if (pkg.scripts && pkg.scripts.build) {
                        sh 'npm run build'
                    } else {
                        echo 'No build script defined, skipping build.'
                    }
                }
            }
        }

        stage('Test') {
            steps {
                // Replace with real tests later
                sh 'echo "No tests available"'
            }
        }

        stage('Deploy to Render') {
            steps {
                sh '''
                  curl -X POST "https://api.render.com/deploy/srv-d377mnmr433s73egb8r0?key=JxEQhyeSBMs"
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment successful! Visit your Render site.'
        }
        failure {
            echo 'Build failed. Check logs in Jenkins.'
        }
    }
}
