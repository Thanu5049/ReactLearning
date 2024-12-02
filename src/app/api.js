// const express = require('express');
// const axios = require('axios'); // To fetch data from JSONPlaceholder
// const app = express();
// const cors = require('cors');
// const port = 8001;
// async function fetchFromPlaceHolder() {
//     try {
//         // Fetch data from JSONPlaceholder
//         const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         throw error;
//     }
// }
// // Rearrange
// function rearrangeData(data) {
//     return data.map(item => {
//         // Add an email field for each item
//         item.email = `${item.id}@gmail.com`;
//         return item;
//     });
// }
// // API endpoint to get the rearranged data
// app.get('/posts', async (req, res) => {
//     try {
//         const data = await fetchFromPlaceHolder();
//         const rearrangedData = rearrangeData(data);
//         res.json(rearrangedData);
//     } catch (error) {
//         res.status(500).send('Error occurred while fetching data');
//     }
// });
// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });