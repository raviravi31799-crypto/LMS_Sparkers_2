pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
        skipDefaultCheckout()
        timeout(time: 30, unit: 'MINUTES')
    }

    environment {
        REPO_URL = 'https://github.com/raviravi31799-crypto/LMS_Sparkers_2.git'
        BRANCH_NAME = 'sriram'
        CI = 'true'
    }

    stages {

        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout Source') {
            steps {
                git branch: "*/${BRANCH_NAME}",
                    url: "${REPO_URL}",
                    credentialsId: 'GITHUB_CREDENTIALS'
            }
        }

        stage('Node Version') {
            steps {
                bat 'node -v'
                bat 'npm -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Chromium') {
            steps {
                bat 'npx playwright install chromium'
            }
        }

        stage('Run Cucumber Tests') {
            steps {
                script {
                    catchError(
                        buildResult: 'FAILURE',
                        stageResult: 'FAILURE'
                    ) {
                        bat 'npm run sriram'
                    }
                }
            }
        }

        stage('Generate Reports') {
            steps {
                script {
                    catchError(
                        buildResult: 'SUCCESS',
                        stageResult: 'UNSTABLE'
                    ) {
                        bat 'npm run posttest'
                    }
                }
            }
        }

        stage('Verify Reports') {
            steps {
                bat '''
                    echo ================================
                    echo Checking generated reports
                    echo ================================

                    if exist reports\\cucumber-html\\cucumber-report.html (
                        echo Cucumber report found
                    ) else (
                        echo Cucumber report NOT found
                    )

                    if exist reports\\cucumber-json\\cucumber-report.json (
                        echo Cucumber JSON found
                    ) else (
                        echo Cucumber JSON NOT found
                    )

                    if exist reports\\html\\index.html (
                        echo Combined HTML report found
                    ) else (
                        echo Combined HTML report NOT found
                    )

                    if exist reports\\screenshots (
                        echo Screenshots found:
                        dir /b reports\\screenshots
                    ) else (
                        echo No screenshots
                    )
                '''
            }
        }
    }

    post {

        always {

            echo "Publishing available reports..."

            // Raw Cucumber HTML Report
            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'reports/cucumber-html',
                reportFiles: 'cucumber-report.html',
                reportName: 'Cucumber HTML Report'
            ])

            // Combined multi-cucumber-html-reporter report
            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'reports/html',
                reportFiles: 'index.html',
                reportName: 'Combined BDD Report'
            ])

            // Archive all reports
            archiveArtifacts(
                artifacts: '''
                    reports/**/*,
                    playwright-report/**/*,
                    test-results/**/*
                ''',
                allowEmptyArchive: true,
                fingerprint: true
            )

            // Email
            emailext(
                subject: "LMS Automation Build #${BUILD_NUMBER} : ${currentBuild.currentResult}",
                mimeType: 'text/html',

                body: """
                <html>
                <body>

                <h2>LMS Playwright Automation Execution</h2>

                <table border="1" cellpadding="8" cellspacing="0">

                    <tr>
                        <td><b>Project</b></td>
                        <td>LMS Playwright BDD</td>
                    </tr>

                    <tr>
                        <td><b>Build</b></td>
                        <td>#${BUILD_NUMBER}</td>
                    </tr>

                    <tr>
                        <td><b>Status</b></td>
                        <td>${currentBuild.currentResult}</td>
                    </tr>

                    <tr>
                        <td><b>Branch</b></td>
                        <td>${BRANCH_NAME}</td>
                    </tr>

                    <tr>
                        <td><b>Duration</b></td>
                        <td>${currentBuild.durationString}</td>
                    </tr>

                </table>

                <br>

                <b>Jenkins Build:</b><br>
                ${BUILD_URL}

                <br><br>

                <b>Cucumber Report:</b><br>
                ${BUILD_URL}Cucumber_20HTML_20Report/

                <br><br>

                <b>Combined BDD Report:</b><br>
                ${BUILD_URL}Combined_20BDD_20Report/

                <br><br>

                Regards,<br>
                LMS Automation Team

                </body>
                </html>
                """,

                to: "titooram123@gmail.com",

                attachmentsPattern: '''
                    reports/cucumber-html/**/*.html,
                    reports/html/**/*,
                    reports/screenshots/*.png
                '''
            )
        }

        success {
            echo "========================================"
            echo "BUILD SUCCESSFUL"
            echo "========================================"
        }

        unstable {
            echo "========================================"
            echo "BUILD UNSTABLE"
            echo "========================================"
        }

        failure {
            echo "========================================"
            echo "BUILD FAILED"
            echo "========================================"
        }

        cleanup {
            cleanWs()
        }
    }
}
