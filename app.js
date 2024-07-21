//require("./db/connect"); //When we have a function in a module which is executed then and there itself we only need to require or import only the module
//In above line we have a connect function in connect.js which is executed then and there itself
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
//require("dotenv").config();//using this we are accessing variable stored in .env file but in case of connection string it is giving open uri error so directly using it below
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
//middleware
app.use(express.static("./public"));
app.use(express.json());

//routes
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);
//Now we do not have any value set for variable PORT in .env so it uses 3000
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(
      "mongodb+srv://ramesh2:OTPxxf6Jzapm7wof@expresstaskmanager.cm5hvui.mongodb.net/TaskManager?retryWrites=true&w=majority&appName=ExpressTaskManager"
    );
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};
//call start method
start();
