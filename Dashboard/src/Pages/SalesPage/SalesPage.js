import React, { useState, useEffect } from "react";
import "./SalesPage.css";
import { DataGrid } from "@mui/x-data-grid";
// import rechart
import { 
  BarChart, Bar, XAxis, YAxis, Cell, CartesianGrid, Tooltip, Legend, Pie, PieChart,
 } from "recharts";

function MoviesPage() {
  const [data, setData] = useState([]);
  const datas = [
    {name: 'Geeksforgeeks', students: 400},
    {name: 'Technical scripter', students: 700},
    {name: 'Geek-i-knack', students: 200},
    {name: 'Geek-o-mania', students: 1000}
  ];
  useEffect(() => {
    const dataMovies = async () => {
      try {
        const res = await fetch("http://localhost:3001/analytics/getAllProfit", {
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
    dataMovies();
  }, []);
    

  const columns = [
    { field: "film_id", headerName: "ID", width: 50 },
    {
      field: "name",
      headerName: "Movie",
      width: 250,
  
    },
    { field: "genres", headerName: "Genre", width: 200 },
    {
      field: "dates_minium",
      headerName: "Khởi chiếu",
      width: 160,
    },

    {
      field: "length",
      headerName: "Length",
      width: 130,
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
    },
    {
      field: "total_revenue",
      headerName: "Sales (VNĐ)",
      width: 180,
    }

  ];


  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF',
  '#FF6699', '#66CCCC', '#CC66CC', '#66CC66', '#CC6666',
  '#663399', '#33CC99', '#CCCC33', '#CC3399', '#3399CC',
  '#9966CC', '#FF9966', '#99CCFF', '#666699', '#FF3333'];



      
    




  return (
    <div className="moviesPage">
      {/* <div style={{ height: "100%", width: "100%" }}>
        {data.data && data.data.Sales.length > 0 ? (
        <DataGrid
          rows={data.data.Sales.map((movie) => 
           ({ ...movie, id: movie.film_id }) 
        )}
          columns={columns}
          pageSize={10}
          checkboxSelection
          disableSelectionOnClick
          getRowId={(r) => r.film_id}    

        />
        ) : (
        <h1>Loading...</h1>
        )}
      </div> */}
      {/* use plotly to chart */}
      <div className="charts-container" style={{ display: "flex" }}>
          <div className="chart">
            <div className="BarChart">
              <h3>Doanh thu theo phim</h3>

              <BarChart
                width={500}
                height={500}
                // data choose the film has total revenue > 100000 and sort by total revenue
                data={data.data && data.data.Sales.length > 0 ? data.data.Sales.filter((movie) => movie.total_revenue > 0) : []}
                
                
                margin={{
                  top: 100,
                  right: 30,
                  left: 50,
                  bottom: 5,
                }}
                
                barSize={40}

              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="film_id" scale="point" padding={{ left: 20, right: 20 }} 
                // name row , position right of Ox
                label={{ value: "ID", position: "insideRight", offset: -20 }} />
                
                <YAxis
                  label={{ value: "VNĐ", position: "insideTop", offset: -40 }}
                 />
                <Tooltip />
                <Legend />
                {/* color green */}
                <Bar dataKey="total_revenue"
                fill="#82ca9d" 
                background={{ fill: "#eee" }} />
                

              </BarChart>        
            
            </div>
          </div>

          <div className="chart">
            <div className="PieChart">
            <h3>Số vé đã bán theo phim</h3>
            <PieChart width={500} height={500}
            margin={{
              top: 50,
              right: 30,
              left: 50,
              bottom: 5,
            }}
            >
              <Pie
                data={data.data && data.data.Sales.length > 0 ? data.data.Sales.filter((movie) => movie.total_ticket > 0) : []}
                cx="50%"
                cy="50%"
                outerRadius={180}
                fill="#8884d8"
                dataKey="total_ticket"
                label
              >
                {data.data && data.data.Sales.length > 0 ? data.data.Sales.filter((movie) => movie.total_ticket > 0).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                )) : []}
              </Pie>
              <Tooltip />
            </PieChart>
            </div>
          </div>
        </div>
        

    </div>
  );
}

export default MoviesPage;
