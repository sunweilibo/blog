---
title: Jenkins
---

## Jenkins

### 任务完成钩子

```sh
post {
        always {
            echo 'This will always run'
        }
        success {
            echo 'This will run only if successful'
        }
        failure {
            echo 'This will run only if failed'
        }
        unstable {
            echo 'This will run only if the run was marked as unstable'
        }
        changed {
            echo 'This will run only if the state of the Pipeline has changed'
            echo 'For example, if the Pipeline was previously failing but is now successful'
        }
    }
```

### 定义执行环境 

### 环境变量

```
pipeline {
		// ...
    environment {
        DISABLE_AUTH = 'true'
        DB_ENGINE    = 'sqlite'
    }
    // ...
}
```

### 执行

大多数最基本的持续交付 Pipeline 至少会有三个阶段：构建、测试和部署，这些阶段被定义在 `Jenkinsfile` 中。 这一小节我们将主要关注部署阶段，但应该指出稳定的构建和测试阶段是任何部署活动的重要前提。

```groovy
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying'
            }
        }
    }
}
```

