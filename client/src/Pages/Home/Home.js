import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import axios from "axios";
import { toast } from "react-toastify";
const Home = () => {
  const [data, setData] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    getProduits();
  }, []);

  const getProduits = async () => {
    const response = await axios.get("http://localhost:3001/produits");
    if (response.status === 200) {
      setData(response.data);
    }
  };

  //console.log(data);

  const deleteProd = async (id) => {
    if (window.confirm("Vous ètes sur ?")) {
      const response = await axios.delete(
        `http://localhost:3001/produits/${id}`
      );
      if (response.status === 200) {
        toast.success(response.data);
        getProduits();
      }
    }
  };

  const handleSearch = async () => {
    if (searchKey.trim() === "") {
      getProduits();
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3001/produits/search/${searchKey}`
      );
      if (response.status === 200) {
        setData(response.data);
        console.log("Search done");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setSearchKey(event.target.value);
  };

  return (
    <div style={{ marginTop: "150px" }}>
      <form
        style={{
          display: "flex",
          width: "18%",
          marginBottom: "20px",
          marginLeft: "790px",
        }}
      >
        <input
          type="text"
          placeholder="Search"
          value={searchKey}
          onChange={handleInputChange}
          onBlur={handleSearch}
        />
        <button style={{ margin: "8px" }} type="submit" onClick={handleSearch}>
          Search
        </button>
      </form>

      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Id</th>
            <th style={{ textAlign: "center" }}>Nom</th>
            <th style={{ textAlign: "center" }}>Prix</th>
            <th style={{ textAlign: "center" }}>Quantité</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <Link to={`/update/${item.id}`}>
                      <button className="btn btn-edit">Modifier</button>
                    </Link>
                    <button
                      onClick={() => deleteProd(item.id)}
                      className="btn btn-delete"
                    >
                      Supprimer
                    </button>

                    <Link to={`/view/${item.id}`}>
                      <button className="btn btn-view">Voir Plus</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
