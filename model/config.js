const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://rhlgr:rhlgr@cluster0.lgnji1m.mongodb.net/?retryWrites=true&w=majority")
.then(() => console.log("connected!!"))
.catch((err) => console.log(err.message));
