# Dark Room Gallery – CI/CD Pipeline with Jenkins, Render & Slack Integration

This repository contains a Node.js gallery application with a **fully automated CI/CD pipeline** using **Jenkins**, deployed to **Render**, tested, and integrated with **Slack notifications**.
# Wesbsite
[https://gallery-xu45.onrender.com]

## Milestone 1: Set up

1. **Fork and clone this repo.**  
2. This is a working application that will be deployed to the cloud.  
3. The application uses MongoDB. To deploy on Render, we use **MongoDB Atlas**, a cloud-hosted MongoDB service.  
4. Create a cluster and a database user on MongoDB Atlas.  
5. Update the `_config.js` file with your MongoDB credentials:  

const USERNAME = "<YOUR_USERNAME>";
const PASSWORD = "<YOUR_PASSWORD>";

## Milestone 2: Basic Pipeline

1. Ensure you have a `Jenkinsfile` with the required instructions.
2. The pipeline should **trigger automatically** on GitHub pushes.
3. Make sure all required software is installed in the pipeline (`node`, `npm`, etc.).
4. Install dependencies using:

npm install

5. Deploy to Render. You can start the server using:

node server.js

6. Update the landing page and add **“MILESTONE 2”** clearly visible.
7. Push changes and check that the website on Render shows **MILESTONE 2**.

## Milestone 3: Tests

1. Switch to the `test` branch to see existing tests.
2. Run tests locally:

npm test

3. Merge the `test` branch with `master`.
4. Update your `Jenkinsfile` to execute tests during the pipeline.
5. Configure notifications if tests fail (email or Slack).
6. Update the landing page to include **“MILESTONE 3”**.
7. Push changes and ensure Render shows **MILESTONE 2** and **MILESTONE 3**.

## Milestone 4: Slack Integration

1. Create a Slack channel named `YourFirstName_IP1` and invite your team.
2. Add **Incoming Webhooks** to your Slack workspace.
3. Store the webhook URL as a **Jenkins secret credential**.
4. Update the `Jenkinsfile` to send a Slack notification after successful deploy:
5. Make a final update to the landing page and add **“MILESTONE 4”**.
6. Push all changes and ensure Render shows **MILESTONE 2**, **MILESTONE 3**, and **MILESTONE 4**.
