import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import fs from "fs";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
  res.send("Hello from the backend!");
});

app.post("/signup", (req, res) => {

  fs.readFile("db.json", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    let existing;
    try {
      existing = JSON.parse(data);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    req.body = { ...req.body, wishlist: [] };
    const updated = [...existing, req.body];
    const jsonData = JSON.stringify(updated, null, 2);

    let user = existing.find(
      (eachUser) => eachUser.useremail === req.body.useremail
    );

    if (user) {
      res.json({
        data: "Account already exists with same username",
        color: "red",
      });
    } else {
      fs.writeFile("db.json", jsonData, (writeError) => {
        if (writeError) {
          console.error("Error writing file:", writeError);
          return res.status(500).json({ error: "Internal Server Error" });
        } else {
          res.json({
            data: "Account created successfully",
            color: "green",
          });
        }
      });
    }
  });
});

app.post("/login", (req, res) => {
  setTimeout(() => {
    fs.readFile("db.json", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      let existing;
      try {
        existing = JSON.parse(data);
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      let user = existing.find(
        (eachUser) =>
          eachUser.useremail === req.body.useremail &&
          eachUser.password === req.body.password
      );
      if (user) {
        res.json({
          data: true,
          username: { name: user.username, useremail: user.useremail,wishlist:user.wishlist },
        });
      } else {
        res.json({
          data: "Invalid Credentials",
          color: "red",
        });
      }
    });
  }, 3000);
});

app.post("/addtowishlist", (req, res) => {
  fs.readFile("db.json", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    let existing;
    try {
      existing = JSON.parse(data);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    let user = existing.findIndex(
      (eachUser) => eachUser.useremail === req.body.useremail
    );

    if (user > -1) {
      if (!req.body.type) {
        let checkWishList = existing[user].wishlist.find(
          (each) => each === req.body.additem
        );
        if (!checkWishList) {
          const updated = [...existing[user].wishlist, req.body.additem];
          existing[user].wishlist = updated;
          const jsonData = JSON.stringify(existing, null, 2);
          fs.writeFile("db.json", jsonData, (writeError) => {
            if (writeError) {
              console.error("Error writing file:", writeError);
              return res.status(500).json({ error: "Internal Server Error" });
            } else {
              res.json({
                data: "Added to wishlist",
                color: "red",
                listArray:updated
              });
            }
          });
        } else {
          res.json({
            data: "Already added in wishlist",
            color: "inherit",
            listArray:existing[user].wishlist
          });
        }
      } else {
        let updated = existing[user].wishlist.filter(
          (each) => each !== req.body.additem
        );
        existing[user].wishlist = updated;
        const jsonData = JSON.stringify(existing, null, 2);
        fs.writeFile("db.json", jsonData, (writeError) => {
          if (writeError) {
            console.error("Error writing file:", writeError);
            return res.status(500).json({ error: "Internal Server Error" });
          } else {
            res.json({
              data: "Removed from wishlist",
              color: "grey",
              listArray:existing[user].wishlist
            });
          }
        });
      }
    }
  });
});

app.get("/getwishlist/:name", (req, res) => {
  fs.readFile("db.json", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    let existing;
    try {
      existing = JSON.parse(data);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    let user = existing.findIndex(
      (eachUser) => eachUser.useremail === req.params.name
    );

    if (user > -1) {
      res.json({
        data: existing[user].wishlist,
      });
    } else {
      res.json({
        data: "Already added in wishlist",
      });
    }
  });
});


//userdetails
app.get("/getUserDetails/:name", (req, res) => {
  fs.readFile("db.json", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    let existing;
    try {
      existing = JSON.parse(data);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    let user = existing.findIndex(
      (eachUser) => eachUser.useremail === req.params.name
    );

    if (user > -1) {
      res.json({
        data: {username:existing[user].username,useremail:existing[user].useremail,wishlist:existing[user].wishlist.length},
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

