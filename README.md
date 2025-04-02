# Setup

1. ensure you have at least version `v22.11.0`
> node --version

if not .....


##  Install `n` (Node Version Manager)

The `n` tool allows you to manage multiple versions of Node.js on your system easily.

To install `n`, follow these steps:

1. **Install `n` via npm (Node's package manager):**

   Open your terminal and run:
   ```bash
   npm install -g n
   ```

   This will globally install `n`, allowing you to use it to manage Node versions.

2. **Verify `n` installation**:

   After installing `n`, you can verify the installation by checking its version:
   ```bash
   n --version
   ```

   This should return the version of `n` you have installed, confirming that the installation was successful.

---

### **Step 2: Install Node.js Version 22 Using `n`**

Now that `n` is installed, you can use it to install any specific version of Node.js, including version 22.

1. **Install Node.js version 22**:
   
   To install Node.js version 22, run the following command in your terminal:
   ```bash
   sudo n 22
   ```

   This command tells `n` to install Node.js version 22. 

2. **Verify Node.js version**:

   After installing, verify that the correct version of Node.js is installed:
   ```bash
   node -v
   ```

   This should display `v22.x.x`, confirming that Node.js version 22 is now installed.

3. **Switch Node.js version**:

    just type:
    ```bash
    sudo n
    ```
    and select the version you want

## Clone Frontend


### **Step 1: Clone the Frontend Repository**

To start, you'll need to clone the frontend repository from GitHub to your local machine. The frontend repository URL is:

**Repository URL**: [https://github.com/pietow/todo_client_p24_e04](https://github.com/pietow/todo_client_p24_e04)

#### 1.1. **Open your terminal**:
   Open a terminal (or command prompt) on your computer.

#### 1.2. **Clone the repository**:
   Run the following `git clone` command to clone the repository to your local machine:
   ```bash
   git clone https://github.com/pietow/todo_client_p24_e04.git
   ```


#### 1.3. **Navigate to the cloned directory**:
   After cloning the repository, navigate to the project directory:
   ```bash
   cd todo_client_p24_e04
   ```

---

### **Step 2: Install Dependencies**

Before running the frontend application, you need to install the necessary dependencies defined in the `package.json` file.
(It is like the `requirements.txt` for Python)

 This can be done using `npm`.

#### 2.1. **Install Node.js dependencies**:
   Run the following command to install the required dependencies:
   ```bash
   npm install
   ```

   -  The `npm install` command reads the `package.json` file in the project directory and installs all the necessary dependencies into a `node_modules` folder.


---

### **Step 3: Run the Development Server**

 you can start the development server (for the frontend) to view the frontend in your browser.

#### 3.1. **Run the development server**:
   Execute the following command to start the development server:
   ```bash
   npm run dev
   ```

   - **What this does**: This runs the `dev` script defined in the `package.json` file






