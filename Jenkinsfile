pipeline {
    agent any
    stages {
        stage('build') {
            steps {
                sh 'npm i && npm run build'
                sh 'cp -ar ./docs/.vuepress/dist /data'
            }
        }
        post {
          
        }
    }
}