pipeline {
    agent any
    environment {
        PROJECT_ID = 'erandiranaweera'
        CLUSTER_NAME = '<<Your GKE Cluster Name>>'
        LOCATION = '<<Your GKE Cluster Location>>'
        CREDENTIALS_ID = 'erandiranaweera'
        registry = "erandiranaweera/cloudcw"
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
                    myapp = docker.build registry + ":$BUILD_NUMBER"
                }
            }
        }
        stage("Push image") {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                            myapp.push("latest")
                            myapp.push("${env.BUILD_ID}")
                    }
                }
            }
        }    
        stage('Deploy to GKE') {
            steps{
                sh "sed -i 's/cloudcw:latest/cloudcw:${env.BUILD_ID}/g' deployment.yaml"
                step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, manifestPattern: 'deployment.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
            }
        }
    }    
}
