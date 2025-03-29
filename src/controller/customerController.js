import { customerCreate } from '../models/customerModel.js';
import axios from "axios";


const customerData = async (req, res) => {
    console.log("api");
    
    console.log("Request Body:", req.body);
    console.log("File Uploaded:", req.file);
// return
    try {
        const { name, email, phone, city = "", state = "", zip = "", street = "" } = req.body;

        // Ensure address is an object
        //const address = req.body.address ? JSON.parse(req.body.address) : {};
        //const { city = "", state = "", zip = "", street = "" } = address;

        // Get file path
        const avatar = req.file ? req.file.path : null;

        // Create customer
        const customer = await customerCreate.create({
            name,
            email,
            phone,
            avatar,
            address: { street, city, state, zip }
        });

        return res.status(201).json({
            message: "Customer created Successfully",
            code: 201,
            data: customer
        });
    } catch (error) {
        console.error("Error creating customer:", error);
        return res.status(500).json({
            message: "Error creating customer",
            code: 500,
            error: error.message
        });
    }
};

const getCustomer = async (req, res, next) => { 
    console.log("cusooooo");
    
    const customer = await customerCreate.find();
    return res.json({
        message: "Customer fetched Successfully",
        code: 200,
        data: customer
    })
}

const updateCustomer = async (req, res) => {     
    try {
        console.log("Updating...", req.params);

        const namedata = req.params.id; // Ensure 'id' is the correct parameter
        console.log("==", namedata);

        const { name, email, phone } = req.body;

        // Await the update operation
        const updateData = await customerCreate.updateMany(
            { name: namedata }, // Ensure this is the correct field
            { $set: { name, email, phone } }
        );

        // Use modifiedCount instead of nModified
        if (updateData.modifiedCount > 0) {
            return res.json({
                message: "Customer updated Successfully",
                code: 200,
                data: updateData
            });
        } else {
            return res.json({
                message: "No customer found with the given name",
                code: 404
            });
        }
    } catch (error) {
        console.error("Error updating customer:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            code: 500,
            error: error.message
        });
    }
};

const deleteCustomer = async (req, res) => { 
    try {
        const namedelete = req.params.id
        console.log("sads", namedelete);
        const response = await customerCreate.deleteOne({
            name: namedelete
        })
        if (response.deletedCount > 0) {
            return res.json({
                message: "Customer(s) deleted successfully",
                code: 200,
                deletedCount: response.deletedCount
            });
        } else {
            return res.json({
                message: "No customer found with the given name",
                code: 404
            });
        }
    } catch (error) {
        console.error("Error deleting customer:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            code: 500,
            error: error.message
        });
    }
}

const getProducts = async (req, res) => {
    const params =  req.query.title;
    console.log(params);
    const data = `query {
        products(query: "title:*${params}*",first: 10, reverse: true) {
          edges {
            node {
              id
              title
              handle
              resourcePublicationOnCurrentPublication {
                publication {
                  name
                  id
                }
                publishDate
                isPublished
              }
            }
          }
        }
      }`;
    //console.log(data);
    try {
        const response = await axios.post(
            process.env.SHOPIFY_GRAPHQL_URL,
            { query:data },
            {
                headers: {
                    'Content-Type': 'application/json',
                    "X-Shopify-Access-Token": process.env.TOKEN
                }
            }
        );
        return res.json({
            message: "Products fetched Successfully",
            code: 200,
            data: response.data
        })
    } catch (error) {
        console.error(`Error fetching products: ${error.message}`);
        return res.status(500).json({
            message: "An error occurred while fetching products",
            code: 500
        });
    }
}

const createProduct =async (req, res) => { 
    const { title, descriptions, price } = req.body;
    const query=`mutation productCreate($input: ProductInput!) {
            productCreate(input: $input) {
                product {
                id
                title
                
                }
                userErrors {
                field
                message
                }
            }
        }`
    const variables = {
        input: {
            title: title,
            descriptionHtml: descriptions,
            
        }
    }
    console.log(query);
    console.log(variables);

       try {
        const response = await axios.post(
            process.env.SHOPIFY_GRAPHQL_URL,
            { query, variables },
            {
                headers: {
                    'Content-Type': 'application/json',
                    "X-Shopify-Access-Token": process.env.TOKEN
                }
            }
        )
        return res.json({
            message: "Products Created Successfully",
            code: 200,
            data: response.data
        })
    } catch (error) {
        console.error(`Error creating products: ${error.message}`);
        return res.status(500).json({
            message: "An error occurred while creating products",
            code: 500,
            error: error.response ? error.response.data : error.message
        });
        
    }
    
}
export { customerData,  getCustomer, updateCustomer, getProducts, createProduct, deleteCustomer};