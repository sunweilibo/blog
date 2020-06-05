pipeline {
    agent any
    stages {
        stage('build') {
            steps {
                sh 'npm i && npm run build'
                sh 'cp -a ./docs/.vuepress/dist /data'
                sh 'cd ..'
                sh 'rm -rf blog'
            }
        }
    }
}