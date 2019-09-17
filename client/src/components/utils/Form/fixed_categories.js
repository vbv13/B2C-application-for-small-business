const size = [
    {
        "_id": 1,
        "name": 'małe'
    },
    {
        "_id": 2,
        "name": 'średnie'
    },
    {
        "_id": 3,
        "name": 'duże'
    }        
]

const price = [
    {
        "_id":0,
        "name":"Dowolna",
        "array":[]
    },
    {
        "_id":1,
        "name":"od $0 do $100",
        "array":[0,100]
    },
    {
        "_id":2,
        "name":"od $101 do $400",
        "array":[101,400]
    },
    {
        "_id":3,
        "name":"od $401 do $800",
        "array":[401,800]
    },
    {
        "_id":4,
        "name":"od $801 do $1800",
        "array":[801,1800]
    }
]

export {
    size,
    price
}

