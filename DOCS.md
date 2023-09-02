.........................Technologies/Stacks and dependencies.........................

1. Next js (Main Stack)
2. Bootstrap (CSS Framework)
3. axios (for HTTP requests | used to fetch data from APIs)
4. react-query (for managing and caching server state)
5. react-icons (using icons)




.........................Procedure to run the project locally.........................

To run the code locally first we have to set up the environment.
1. Make sure to have node and npm install and set up properly in the local machine,
2. Should have atleast 1 IDE (VS code recommended)
3. After cloning the code, we need some dependencies for this project. For this, install the dependencies using the following command
    i. npm install axios 
    ii. npm install react-query
    iii. npm install bootstrap
    iv. npm install react-icons
    v. npm install react-toastify
    vi. npm install react-router-dom
    vii. Or type 'npm install' after cloning the project (It will install all the required modules and dependencies accordingly)

After the installation part, in the termainal type "npm run dev" or "yarn run dev" according to the system requirement.
Now the project is live on the server, i.e type localhost:3000 in the address bar of any browser and we can see and feel the project. Generally our project is hosted on 3000 port but we can change that port too. 





.........................Further Enhancement.........................

We can use user login featuer using JWT token for authentication and MySQL or MongoDB database for storing user credentials. And for security purpose, we have Hashing and Salting technique.