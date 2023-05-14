const express = require("express")
const app = express()
const mysql = require("mysql")
const cors = require("cors")

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Chingy43!",
  database: "Mushroom-inventory-DB",
})

app.use(cors())
app.use(express.json())

app.post("/api/insert", (req, res) => {
  const { itemName, quantity, location, pricePerUnit } = req.body

  const sqlInsert =
    "INSERT INTO item_inv (itemName, quantity, location, pricePerUnit) VALUES (?,?,?,?);"
  db.query(
    sqlInsert,
    [itemName, quantity, location, pricePerUnit],
    (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).send("Error inserting data into database")
      } else {
        res.status(201).send("Data inserted into database")
      }
    }
  )
})

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM item_inv"
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send("Error retrieving data from database")
    } else {
      res.send(result)
    }
  })
})

app.delete("/api/delete/:id", (req, res) => {
  const itemId = req.params.id

  const sqlDelete = "DELETE FROM item_inv WHERE id=?"
  db.query(sqlDelete, [itemId], (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send({ error: "Error deleting item" })
    } else {
      res.send({ message: "Item deleted successfully" })
    }
  })
})

app.put("/api/update/:id", (req, res) => {
  const itemId = req.params.id
  const updatedItem = req.body

  const sqlUpdate =
    "UPDATE item_inv SET itemName=?, quantity=?, location=?, pricePerUnit=? WHERE id=?"
  db.query(
    sqlUpdate,
    [
      updatedItem.itemName,
      updatedItem.quantity,
      updatedItem.location,
      updatedItem.pricePerUnit,
      itemId,
    ],
    (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).send({ error: "Error updating item" })
      } else {
        res.send(updatedItem)
      }
    }
  )
})

app.listen(8080, () => {
  console.log("Server listening on port 8080")
})
