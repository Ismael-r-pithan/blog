const posts = [
    {id: 'abcd1234', added_by: '2020-01-01', created_at: 'abcd1235', content: 'post 01' },
    {id: 'abcd1235', added_by: '2020-01-01', created_at: 'abcd1236', content: 'post 02' },
    {id: 'abcd1236', added_by: '2020-01-01', created_at: 'abcd1237', content: 'post 03' },
    {id: 'abcd1237', added_by: '2020-01-01', created_at: 'abcd1238', content: 'post 04' },
    {id: 'abcd1238', added_by: '2020-01-01', created_at: 'abcd1239', content: 'post 05' }
];

const findAll = () => { return posts }

const save = (post) => { posts.push(post) }

const findById = (id) => { return posts.find(p => p.id == id) }


module.exports = { findAll, save, findById }


