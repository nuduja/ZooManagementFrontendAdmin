import {Link} from "react-router-dom";
import React from "react";

export const allCustomersColumns =[
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'Username',
        accessor: 'username',
    },
    {
        Header: 'Actions',
        // Cell: ({ row }) => (
        //     <Link to={`/admin/${row.original.username}`} className="p-button p-button-text">
        //         View Details
        //     </Link>
        // ),
    },
]