
// TODO for making our API RESTful
// REST ----> REpresentational State Transfer

// require("dotenv").config();
const dotenv = require("dotenv");
dotenv.config();

// Server Starting Code
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

// Add the body-parser middleware to parse request bodies as JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Parse JSON data in the request body

app.use(express.static("public"));


mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster1.4158yrd.mongodb.net/wikiDB`, 
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
.then(() => { console.log("Connected") })
.catch((err) => { console.log(err)});


const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Article = mongoose.model("Article", articleSchema);


// ***************************** Requests Targetting All Articles ****************************

// Chained Route Handlers Using Express  ---> Using app.route()
app.route("/articles")
    // GET request to "/articles" route  --->  Fetches all the articles
    .get(async function (req, res) {
        try {
            const foundArticles = await Article.find({});
            // console.log(foundArticles);
            res.send(foundArticles);
        } catch (err) {
            // console.log(err);
            res.send(err);
        }
    })
    // POST request to "/articles" route  --->  Creates one new article
    .post(async function (req, res) {
        // console.log(req.body.title);
        // console.log(req.body.content);

        try {
            // Use req.body to access the data from the JSON request
            const newArticle = new Article({
                title: req.body.title,
                content: req.body.content
            });

            await newArticle.save();

            res.send("Successfully added a new article.");
        } catch (err) {
            res.send(err);
        }
    })
    // DELETE request to "/articles" route  --->  Deletes all the articles
    .delete(async function (req, res) {
        try {
            await Article.deleteMany({});
            res.send("Successfully deleted all articles.");
        } catch (err) {
            res.send(err);
        }
    });




// ***************************** Requests Targetting A Specific Article ****************************

// Chained Route Handlers Using Express  ---> Using app.route()
app.route("/articles/:articleTitle")
    // GET request to "/articles/jack-bauer" route  --->  Fetches the article on jack-bauer
    .get(async function(req, res) {
        try {
            const foundArticle = await Article.findOne( {title: req.params.articleTitle} );
            if(foundArticle) {
                res.send(foundArticle);
            } else {
                res.send("No articles matching that title was found.");
            }
        } catch (err) {
            res.send(err);
        }
    })
    // PUT repquest to "/articles/jack-bauer" route  --->  Updates the article on jack-bauer
    .put(async function(req, res) {  
        // PUT request is meant to replace entire resource with new one
        // e.g. Broken bicycle is replaced by brand new bicycle
        try {
            const articleTitle = req.params.articleTitle;
            const updatedTitle = req.body.title;
            const updatedContent = req.body.content;

            // Use await with Article.findOneAndUpdate() to wait for the update operation to complete
            const foundArticle = await Article.findOneAndUpdate(
                { title: articleTitle }, // Find the article based on the current title
                { title: updatedTitle, content: updatedContent }, // Update the title and content
                { overwrite: true } // Set `overwrite: true` to replace the entire document
            );

            if (foundArticle) {
                res.send("Successfully updated article.");
            } else {
                res.send("Article not found.");
            }
        
        } catch (err) {
            res.send(err);
        }
    })
    // PATCH request to "/articles/jack-bauer" route  --->  Updates the article on jack-bauer
    .patch(async function(req, res) {
        // console.log(req.body);
        try {
            const articleTitle = req.params.articleTitle;
            const updatedData = req.body; // The request body contains the fields to be updated

            // Use await with Article.findOneAndUpdate() to wait for the update operation to complete
            const foundArticle = await Article.findOneAndUpdate(
                // conditions
                { title: articleTitle }, // Find the article based on the current title
                // updates using $set
                { $set: updatedData }, // Use the $set operator to apply the partial update
                { new: true } // Set `new: true` to return the updated document after the update
            );

            if (foundArticle) {
                res.send("Successfully updated a specified article.");
            } else {
                res.send("Article not found!");
            }
        
        } catch (err) {
            res.send(err);
        }
    })
    // DELETE request to "/articles/jack-bauer" route  --->  Deletes the article on jack-bauer
    .delete(async function(req, res) {
        try {
            const articleTitle = req.params.articleTitle;

            // Use await with Article.deleteOne() to wait for the delete operation to complete
            const deleteResult = await Article.deleteOne({ title: articleTitle });

            if (deleteResult.deletedCount === 1) {
                res.send("Successfully deleted the specified article.");
            } else {
                res.send("Article not found!");
            }

        } catch (err) {
            res.send(err);
        }               
    });
 



app.listen(3000, function () {
    console.log("Server started on port 3000");
});




// // GET request to "/articles" route  --->  Fetches all the articles
// app.get("/articles", function(req, res) {

//     Article.find({}, function(err, foundArticles) {
//         if(err) {
//             // console.log(err);
//             res.send(err);
//         } else {
//             // console.log(foundArticles);
//             res.send(foundArticles);
//         }
//     });

// });


// // POST request to "/articles" route  --->  Creates one new article
// app.post("/articles", function(req, res) {
//     // console.log(req.body.title);
//     // console.log(req.body.content);

//     const newArticle = new Article({
//         title: req.body.title,
//         content: req.body.content
//     });

//     newArticle.save( function(err) {

//         if(err) {
//             res.send(err); 
//         } else {
//             res.send("Successfully added a new article.");
//         }

//     });

// });


// // DELETE request to "/articles" route  --->  Deletes all the articles
// app.delete("/articles", function(req, res) {

//     Article.deleteMany( {}, function(err) {
//         if(err) {
//             res.send(err);
//         } else {
//             res.send("Successfully deleted all articles.");
//         }
//     });

// });


