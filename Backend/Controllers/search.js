const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

app.get('/search', async (req, res) => {
    const { query } = req.query;
    const results = await client.search({
        index: 'users,posts',
        body: {
            query: {
                multi_match: {
                    query,
                    fields: ['username', 'content', 'hashtags']
                }
            }
        }
    });
    res.json(results.hits.hits);
});
