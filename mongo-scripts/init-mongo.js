conn = new Mongo();
db = conn.getDB("local");


db.createCollection('products', { capped: false });

db.products.insertOne({
            _id: 1,
            name: "Cadeira" , 
            previousPrice: 19.99 , 
            price: 17.50 , 
            status:"Disponivel" , 
            categories:"Praia" , 
            img_path:"" 
                    });
db.products.insertOne({
            _id: 2,
            name: "Banco" , 
            previousPrice: 59.99 , 
            price: 77.50 , 
            status:"Indisponivel" , 
            categories:"Casa" , 
            img_path:"" 
                    });
db.products.insertOne({
            _id: 3,
            name: "Mesa" , 
            previousPrice: 119.99 , 
            price: 177.50 , 
            status:"Promoção" , 
            categories:"Casa" , 
            img_path:"" 
                    });


