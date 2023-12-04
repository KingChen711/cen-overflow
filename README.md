# Chen Overflow - A clone of Stack Overdlow

## 🌐 Demo

Here is a working live demo:  <https://chen-overflow.vercel.app/>

## 📝 Description

Welcome to my project! Here, I'll provide you with a brief overview of what inspired me to create it, and what I've learned throughout its development.

- Motivation: I was motivated to build this project to address a specific issue and to enhance my coding skills.
- What I Learned: Throughout the development process, I gained valuable insights into various technologies and programming concepts.

## 🛠️ Setup Project

To get this project up and running in your development environment, follow these step-by-step instructions.

### 🍴 Prerequisites

We need to install or make sure that these tools are pre-installed on your machine:

- [NodeJS](https://nodejs.org/en/download/): It is a JavaScript runtime build.
- [PNPM](https://pnpm.io/installation): Fast, disk space efficient package manager

## 🔍 Usage

### How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/KingChen711/chen-overflow.git

# Go into the repository
$ cd chen-overflow

# Install dependencies
$ pnpm i

# Run the app
$ pnpm dev
```

### 📩 Bug / Feature Request

If you find a bug (the website couldn't handle the query and / or gave undesired results), kindly open an issue [here](https://github.com/kingchen711/chen-overflow/issues/new) by including your search query and the expected result.

If you'd like to request a new function, feel free to do so by opening an issue [here](https://github.com/kingchen711/chen-overflow/issues/new/issues/new). Please include sample queries and their corresponding results.

## 🔒 ENV file

About the docs to get below keys

```bash
https://dashboard.clerk.com/
https://www.tiny.cloud/
https://platform.openai.com/api-keys
https://cloud.mongodb.com/
```

Create .env.local and complete this content

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=fill_your
CLERK_SECRET_KEY=fill_your

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_CLERK_WEBHOOK_SECRET=fill_your

NEXT_PUBLIC_TINY_EDITOR_API_KEY=fill_your

MONGODB_URL=fill_your

NEXT_PUBLIC_SERVER_URL=http://localhost:3000
OPEN_AI_API_KEY=fill_your
```
