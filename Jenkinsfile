pipeline {
    agent any
    environment {
        PROJECT_ID = 'erandiranaweera'
        CLUSTER_NAME = 'cluster-1'
        LOCATION = 'us-central1-c'
        CREDENTIALS_ID = 'erandiranaweera'
    }
    stages {
        stage("Checkout code") {
            steps {
                checkout scm
            }
        }
        stage("Build image") {
            steps {
                script {
                    myapp = docker.build('erandiranaweera/cloudcw:${env.BUILD_ID}')
                }
            }
        }
        stage("Push image") {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub') {
                            myapp.push('latest')
                    }
                }
            }
        }    
        
    }    
}
