import axios from "axios";

const ProudctData = async (req, res) => { 
    
    const  params = req.query.title ? req.query.title : " ";
    console.log(params);

    const query = `query {
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
    
    try {
        const response = await axios.post(
            process.env.SHOPIFY_GRAPHQL_URL,
            { query:query },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': process.env.TOKEN
                }
            }
        );

        return res.json({
            message: "Products fetched Successfully",
            code: 200,
            data: response.data
        })
     }
    catch (error) { 
        console.error(`Error fetching products: ${error.message}`);
        return res.status(500).json({
            message: "An error occurred while fetching products",
            code: 500
        });
    }
}

export { ProudctData };