import "./RoomPage.css";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { Link } from "react-router-dom";

function RoomPage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const dataCinemas = async () => {
            try {
                const res = await fetch("http://localhost:3001/cinema/getAllCinemaRoom", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const result = await res.json();
                setData(result);
            } catch (error) {
                console.log(error);
            }
        };
        dataCinemas();
    }, []);

    const columns = [
        { field: "room_id", headerName: "ID", width: 100 },
        {
            field: "name",
            headerName: "Cinema",
            width: 300,
        },
        {
            field: "name_room",
            headerName: "Room",
            width: 300,
        },
        {
            field: "address",
            headerName: "Address",
            width: 300,
        },
        {
            field: "edit",
            headerName: "",
            width: 130,
            renderCell: (params) => {
                return (
                    <div className="actionRow">
                        {/* <Link
                    to={{ pathname: "/schedule/" + params.row.showtime_id, schedule: params.row.showtime_id }}
                  >
                    <button className="edit">Edit</button>
                  </Link> */}
                        <button className="edit">Edit</button>
                        <DeleteForeverOutlinedIcon
                            className="icon"
                        // onClick={() => handleDelete(params.row.showtime_id)}
                        />
                    </div>
                );
            },
        },
    ];


    return (
        <>
            <div className="roompage">
                <div style={{ height: "100%", width: "100%" }}>
                    {data && data.data && data.data.cinema.length > 0 ? (
                        <DataGrid
                            rows={data.data.cinema.map((cinema) =>
                                ({ ...cinema, id: cinema.room_id })
                            )}
                            columns={columns}
                            pageSize={8}
                            checkboxSelection
                            disableSelectionOnClick
                            getRowId={(r) => r.room_id}
                        />
                    ) : (
                        <h1>Loading...</h1>
                    )}
                </div>
            </div>
        </>
    );
}

export default RoomPage;