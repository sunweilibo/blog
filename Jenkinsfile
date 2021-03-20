pipeline {
    agent any
    stages {
        stage('build') {
            steps {
                sh 'npm run init && npm run build'
                sh 'rm -rf /data/blog'
                sh 'cp -a ./docs/.vuepress/dist /data/blog'
            }
        }
    }
    post {
        cleanup {
            /* clean up tmp directory */
            dir("${workspace}@tmp") {
                deleteDir()
            }
            dir("${workspace}@script") {
                deleteDir()
            }
            /* clean up our workspace */
            deleteDir()
            /* clean up script directory */
        }
    }
}