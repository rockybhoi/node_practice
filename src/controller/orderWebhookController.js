import axios from "axios";

const orderData = async (req, res) => {
    try {
        const orderdata = req.body;
        orderdata.line_items.forEach(async (item) => {
            if (item.product_id == "9840827859235") {
                const query = `mutation productCreate($input: ProductInput!) {
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
                        }`;
                const variables = {
                    input: {
                        title: item.name + "Test",
                        descriptionHtml: "Test Description",
                        vendor: "Test Vendor",
                        productType: "Test Type",
                        tags: ["tag1", "tag2"],
                    },
                };   
                console.log("query", query);
                
                console.log("variables", variables);
                

                const response = await axios.post(
                    process.env.SHOPIFY_GRAPHQL_URL,
                    { query, variables },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Shopify-Access-Token': process.env.TOKEN
                        }
                    }
                )

                console.log("response", response.data);
                return res.json({
                    message: "Products created Successfully",
                    code: 200,
                    data: response.data
                })

            } else {
                console.log("not Found", item.product_id);
            }
        })

    } catch (error) {
        console.error(`Error fetching products: ${error.message}`);
        return res.status(500).json({
            message: "An error occurred while fetching products",
            code: 500
        });
    }


}
export { orderData };