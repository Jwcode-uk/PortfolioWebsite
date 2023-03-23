import './Blog.css';
import '../App.css';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

function BlogsCI() {
  const homeOnClickRef = useRef(null);
  const scrollEffect = (targetRef) => {
    targetRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div ref={homeOnClickRef}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <Link to="/blogs">
        <button type="button" className="back-btn">
          <i className="fa fa-arrow-left" />
          {' '}
          Back
        </button>
      </Link>

      <div className="blog-container">
        <div className="blog-content">
          <h2 className="blog-title">
            Set Up Continuous Integration for a React Website Using GitHub Actions and AWS S3
          </h2>
          <p className="blog-author">By Jonathan WHite</p>
          <hr className="blog-divider" />
          <p className="blog-body">
            In this tutorial, we will demonstrate how to set up a Continuous Integration (CI)
            pipeline for a React website using GitHub Actions, and deploy the built website to
            an AWS S3 bucket. Continuous Integration allows you to automate the process of building,
            testing, and deploying your application to ensure that it&apos;s always in a releasable
            state.
          </p>
          <p className="blog-body">Prerequisites:</p>
          <ul className="blog-body">
            <li>A React project hosted on GitHub</li>
            <li>An AWS account with access to the S3 service</li>
          </ul>
          <p className="blog-body">Step-by-Step Guide:</p>
          <p className="blog-body">Step 1: Set up an AWS S3 Bucket</p>
          <ol className="blog-body">
            <li>Log in to your AWS Management Console and navigate to the S3 service.</li>
            <li>Click &apos;&apos;Create bucket&apos;&apos;.</li>
            <li>Enter a unique name for your bucket and choose a region.</li>
            <li>
              Under &apos;&apos;Bucket settings for Block Public Access&apos;&apos;
              , uncheck &apos;&apos;Block all public access&apos;&apos; if you want your website
              to be publicly accessible.
            </li>
            <li>Click &apos;&apos;Create bucket&apos;&apos;.</li>
          </ol>
          <p className="blog-body">Step 2: Create an AWS IAM User for Deployment</p>
          <ol className="blog-body">
            <li>Navigate to the IAM service in the AWS Management Console.</li>
            <li>
              Click &apos;&apos;Users&apos;&apos; in the left sidebar,
              then click &apos;&apos;Add user&apos;&apos;.
            </li>
            <li>
              Enter a username and select &apos;&apos;Programmatic access
              &apos;&apos; as the access type.
            </li>
            <li>
              Click &apos;&apos;Next: Permissions&apos;&apos; and
              then click &apos;&apos;Create policy&apos;&apos;.
            </li>
            <li>
              Choose the &apos;&apos;JSON&apos;&apos; tab and paste the following policy, replacing
              &lt;your-bucket-name&gt; with the name of the S3 bucket you created in Step 1:
            </li>
            <pre>
              <code>
                {`{
    "Version": "2022-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": "s3:*",
        "Resource": [
          "arn:aws:s3:::<your-bucket-name>",
          "arn:aws:s3:::<your-bucket-name>/*"
        ]
      }
    ]
  }`}
              </code>
            </pre>

            <li>
              Click &apos;&apos;Review policy&apos;&apos;, enter a name for the policy,
              and click &apos;&apos;Create policy&apos;&apos;.
            </li>
            <li>
              Return to the &apos;&apos;Add user&apos;&apos; screen, refresh the policy list,
              and attach the newly created policy.
            </li>
            <li>
              Click &apos;&apos;Next: Tags&apos;&apos;, then &apos;&apos;Next:
              Review&apos;&apos;, and finally &apos;&apos;Create user&apos;&apos;.
            </li>
            <li>
              Download the Access key ID and Secret access key (store them securely
              as they will be used later).
            </li>
          </ol>
          <p className="blog-body">Step 3: Configure GitHub Secrets for Deployment</p>
          <ol className="blog-body">
            <li>
              Navigate to your GitHub repository and click on
              &apos;&apos;Settings&apos;&apos;.
            </li>
            <li>Click &apos;&apos;Secrets&apos;&apos; in the left sidebar.</li>
            <li>
              Click &apos;&apos;New repository secret&apos;&apos; and add the following secrets
              with their respective values:
            </li>
            <ul>
              <li>AWS_ACCESS_KEY_ID: Your IAM user&apos;s Access key ID</li>
              <li>AWS_SECRET_ACCESS_KEY: Your IAM user&apos;s Secret access key</li>
            </ul>
          </ol>
          <p className="blog-body">Step 4: Create GitHub Actions Workflow</p>
          <ol className="blog-body">
            <li>
              In your React project, create a new directory named .github and inside it,
              create another directory named workflows.
            </li>
            <li>Create a new file named deploy.yml inside the workflows directory.</li>
            <li>Add the following content to deploy.yml:</li>
            <pre>
              <code>
                {`name: Deploy React Website to AWS S3

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: 14

      - name: Install dependencies and build
        run: |
          npm ci
          npm run build

      - name: Deploy to AWS S3
        uses: jakejarvis/s3-sync-action@master
        with:
          args: --acl public-read --follow-symlinks --delete
        env:
          AWS_S3_BUCKET: <your-bucket-name>
          AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}`}
              </code>
            </pre>
          </ol>

          <button onClick={() => scrollEffect(homeOnClickRef)} type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#6b6b6b"
              width="50px"
              height="50px"
            >
              <path d="M12 3.293l-6.646 6.647 1.414 1.414L12 6.12l5.232 5.232 1.414-1.414L12 3.293z" />
            </svg>
          </button>

        </div>
      </div>
    </div>

  );
}

export default BlogsCI;
