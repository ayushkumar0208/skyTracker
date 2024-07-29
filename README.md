
# SkyTracker



https://github.com/user-attachments/assets/681103f5-8c2c-4833-8585-158ac760a4f2






## Setting Up - Frontend
### Prerequisites

Before you begin, ensure you have met the following requirements:
- **Node.js**: Install Node.js from [Node.js official website](https://nodejs.org/).
- **npm or yarn**: Node.js package manager (npm is included with Node.js, but you can also install [Yarn](https://yarnpkg.com/)).

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ayushkumar0208/skyTracker.git
   cd skyTracker/Frontend

2. **Install dependencies:**
   
   ```bash
   npm install

3. **Running the Application**

   ```bash
   npm start
   
## Setting Up - Backend
### Prerequisites for Running a Spring Project

Before you can run a Spring project, ensure you have the following prerequisites installed and configured on your machine:

1. **Java Development Kit (JDK)**

- **Version:** JDK 8 or higher (depending on the Spring version used).
- **Installation:** Download and install from the [Oracle JDK website](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) or [OpenJDK](https://openjdk.java.net/).

2. **Apache Maven**

- **Version:** 3.6 or higher.
- **Installation:** Download and install from the [Apache Maven website](https://maven.apache.org/download.cgi). Follow the [installation guide](https://maven.apache.org/install.html) for setup instructions.

3. **Integrated Development Environment (IDE)**

- **Recommended IDEs:**
  - [IntelliJ IDEA](https://www.jetbrains.com/idea/download/) (preferred for Spring projects)
  - [Eclipse](https://www.eclipse.org/downloads/)
  - [VS Code](https://code.visualstudio.com/) with appropriate extensions

4. **RabbitMQ**

- **Installation:**
  - **Windows:**
    1. Download the RabbitMQ installer from the [RabbitMQ website](https://www.rabbitmq.com/download.html).
    2. Run the installer and follow the setup instructions.
    3. Start RabbitMQ service from the command line or using the Windows Services manager.
  
  - **macOS:**
    1. Install RabbitMQ using Homebrew:
       ```bash
       brew install rabbitmq
       ```
    2. Start RabbitMQ server:
       ```bash
       brew services start rabbitmq
       ```

  - **Linux:**
    1. Install RabbitMQ using your package manager. For Debian-based systems:
       ```bash
       sudo apt-get update
       sudo apt-get install rabbitmq-server
       ```
    2. Start RabbitMQ server:
       ```bash
       sudo systemctl start rabbitmq-server
       ```
- **Creating a .env file:** To configure the application, create a `.env` file at the following path:
   ```bash
   skyTracker/Backend/flight/src/main/resources
   
- **.env file**
  ```bash
   MONGO_DATABASE=
   MONGO_USER=
   MONGO_PASSWORD=
   MONGO_CLUSTER=
   FLIGHT_DETAILS_AUTHORIZATION=
   AUTHORIZATION_TOKEN_AIRPORT=Bearer 
   AUTHORIZATION_TOKEN_DELAY=Bearer 
   AUTHORIZATION_TOKEN_FLIGHT=Bearer
Note: Add Token after 'Bearer' Keyword.
<p>Get AUTHORIZATION_TOKEN_AIRPORT from : <a href="https://bit.ly/4bYoG3W">https://bit.ly/4bYoG3W</a></p>
<p>Get AUTHORIZATION_TOKEN_DELAY from : <a href="https://bit.ly/3Wj4iom">https://bit.ly/3Wj4iom</a></p>
<p>Get AUTHORIZATION_TOKEN_FLIGHT from : <a href="https://bit.ly/46ol3mG">https://bit.ly/46ol3mG</a></p>

- **Management Interface:** RabbitMQ provides a web-based management interface. Enable it by running:
  ```bash
  cd C:\Program Files\RabbitMQ Server\rabbitmq_server-3.13.6\sbin
  rabbitmq-plugins enable rabbitmq_management
  rabbitmq-server



