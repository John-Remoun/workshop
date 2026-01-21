const express = require("express");
const mysql2 = require("mysql2");
const port = 3000;
const app = express();
app.use(express.json());

const db = mysql2.createConnection({
  host: "127.0.0.1",
  port: 3306,
  database: "retail_store",
  user: "root",
  password: "",
  multipleStatements: true,
});
db.connect((error) => {
  if (error) {
    console.log("it is error on connection 🤦‍♂️");
  } else {
    console.log("connected baby😉");
  }
});

//===================  1  ==================
app.post("/create-tables", (req, res) => {
  const sql = `
        CREATE TABLE Suppliers(
            s_id int auto_increment primary key,
            s_name varchar(100),
            s_number varchar (20)
        );
        CREATE TABLE Products(
            p_id int auto_increment primary key,
            p_name varchar(100),
            p_price decimal(10,2),
            p_stockquantity int,
            s_id int,
            foreign key (s_id) references Suppliers(s_id)
        );
        CREATE TABLE Sales(
            sale_id int auto_increment primary key,
            p_id int,
            quantity int,
            sale_date date,
            foreign key (p_id) references Products(p_id)
        ); `;

  db.query(sql, (error) => {
    if (error) {
      return res.status(500).json(error);
    }
    res.json({ message: "table created 👍" });
  });
});

//===================  2  ==================
app.put("/addCategory", (req, res) => {
  db.query(`alter table Products add category varchar(50);`, (error) => {
    if (error) {
      return res.status(500).json(error);
    }
    res.json({ message: "Category added 👍" });
  });
});

//===================  3  ==================
app.put("/removeCategory", (req, res) => {
  db.query(`alter table Products drop column category;`, (error) => {
    if (error) {
      return res.status(500).json(error);
    }
    res.json({ message: "Category removed 👍" });
  });
});

//===================  4  ==================
app.put("/change", (req, res) => {
  db.query(`alter table Suppliers modify s_number varchar(50);`, (error) => {
    if (error) {
      return res.status(500).json(error);
    }
    res.json({ message: "updated 👍" });
  });
});

//===================  5  ==================
app.put("/notnull", (req, res) => {
  db.query(
    `alter table Products modify p_name varchar(100) not null;`,
    (error) => {
      if (error) {
        return res.status(500).json(error);
      }
      res.json({ message: "not null added 👍" });
    },
  );
});

//===================  6  ==================
//a
app.post("/addsupplier", (req, res) => {
  const { s_name, s_number } = req.body;
  const sql = ` INSERT INTO Suppliers (s_name, s_number)VALUES (?, ?)`;

  db.execute(sql, [s_name, s_number], (error) => {
    if (error) {
      return res.status(500).json({ message: "Can Not Added 👎", error });
    }
    res.json({ message: "Supplier Added 👍" });
  });
});
//b
app.post("/addproducts", (req, res) => {
  const sql = `INSERT INTO Products (p_name, p_price, p_stockquantity, s_id) VALUES (?, ?, ?, ?)`;

  req.body.forEach((product) => {
    const { p_name, p_price, p_stockquantity, s_id } = product;

    db.execute(sql, [p_name, p_price, p_stockquantity, s_id], (error) => {
      if (error) {
        return res.status(500).json({ message: "Can Not Added 👎", error });
      }
    });
  });

  res.json({ message: "All Products Added 👍" });
});
//c
app.post("/addsales", (req, res) => {
  const { p_id, quantity, sale_date } = req.body;
  const sql = ` INSERT INTO Sales (p_id, quantity, sale_date)VALUES (?, ?, ?)`;

  db.execute(sql, [p_id, quantity, sale_date], (error) => {
    if (error) {
      return res.status(500).json({ message: "Can Not Added 👎", error });
    }
    res.json({ message: "Sale Added 👍" });
  });
});

//===================  7  ==================
app.put("/updateprice", (req, res) => {
  const { p_price, p_name } = req.body;

  const sql = `UPDATE Products SET p_price = ? WHERE p_name = ?`;

  db.execute(sql, [p_price, p_name], (error) => {
    if (error) {
      return res.status(500).json({ message: "Can Not Updated 👎", error });
    }
    if (!p_name?.length) {
      return res.status(404).json({ message: "Product Not Found 👎" });
    }
    res.json({ message: "Price Updated 👍" });
  });
});

//===================  8  ==================
app.delete("/deleteproduct", (req, res) => {
  const { p_name } = req.body;

  const sql = `delete from products where p_name = ? `;

  db.execute(sql, [p_name], (error) => {
    if (error) {
      return res.status(500).json({ message: "Can Not deleted 👎", error });
    }
    if (!p_name?.length) {
      return res.status(404).json({ message: "Product Not Found 👎" });
    }
    res.json({ message: "Product Deleted 👍" });
  });
});

//===================  9  ==================
app.get("/totalsold", (req, res) => {
  const sql = `
     SELECT 
      p.p_name, 
      SUM(s.quantity)
      AS total_sold
    FROM Products p
    LEFT JOIN Sales s ON p.p_id = s.p_id
    GROUP BY p.p_name
  `;
  db.query(sql, (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Can Not find 👎", error });
    }
    res.json({ message: "Done 👍", results });
  });
});

//===================  10  ==================
app.get("/higheststock", (req, res) => {
  const sql = ` select * from products order by p_stockquantity `;
  db.query(sql, (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Can Not find 👎", error });
    }
    res.json({ message: "Done 👍", results });
  });
});

//===================  11  ==================
app.get("/findsuppliers", (req, res) => {
  const { start } = req.query;

  const sql = ` select * from suppliers where s_name like ? `;

  db.query(sql, [`${start}%`], (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Can Not find 👎", error });
    }
    res.json({ message: "Done 👍", results });
  });
});

//===================  12  ==================
app.get("/productsnotsold", (req, res) => {
  const sql = `
    select p.p_name
    from Products p
    left join Sales s on p.p_id = s.p_id
    where s.p_id is null
  `;
  db.query(sql, (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Can Not find 👎", error });
    }
    res.json({ message: "Done 👍", results });
  });
});

//===================  13  ==================
app.get("/sales", (req, res) => {
  const sql = `
    select p.p_name, s.quantity, s.sale_date
    from Sales s
    left join Products p on s.p_id = p.p_id
  `;
  db.query(sql, (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Can Not find 👎", error });
    }
    res.json({ message: "Done 👍", results });
  });
});

//===================  14  ==================
app.put("/createuser", (req, res) => {
  const sql = `
    ALTER USER 'store_manager'@'localhost' IDENTIFIED BY '123';
    GRANT SELECT, INSERT, UPDATE ON retail_store.* TO 'store_manager'@'localhost';
    FLUSH PRIVILEGES;
  `;

  db.query(sql, (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Can Not create user 👎", error });
    }
    res.json({ message: "User Created 👍", results });
  });
});

//===================  15  ==================
app.put("/revoke", (req, res) => {
  const sql = `REVOKE UPDATE ON retail_store.* FROM 'store_manager'@'localhost'`;
  db.execute(sql, (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Can Not revoke 👎", error });
    }
    res.json({ message: "User Revoked 👍" }, results);
  });
});

//===================  16  ==================
app.put("/grant", (req, res) => {
  const sql = `GRANT DELETE ON retail_store.Sales TO 'store_manager'@'localhost'`;
  db.execute(sql, (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Can Not grant 👎", error });
    }
    res.json({ message: "Delete Granted 👍" }, results);
  });
});

// ================= Server =================
app.listen(port, () => {
  console.log(`Server Is running on port ${port} 🚀`);
});
