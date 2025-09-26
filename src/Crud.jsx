import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const Crud = () => {
    const apiUrl = "http://localhost:5000/players";

    const [players, setPlayer] = useState([]);
    const [isUpdate, setisUpdate] = useState([false]);
    const [editId, seteditId] = useState([]);


    const [formdata, setFormdata] = useState({
        name: "",
        age: "",
        position: "",


    }, []

    );


    useEffect(() => {
        fetchPlayers();
    }, []);


    const fetchPlayers = async () => {
        debugger
        const res = await axios.get(apiUrl);
        console.log(res.data);
        setPlayer(res.data);
    }


    const Edit = async (id, players) => {
        const res = await axios.put(`${apiUrl}/${id}`, players)
            .then((res) => {
                debugger
                const data=res.data;
                setFormdata({
                    name:data.name,
                    age:data.age,
                    position:data.position

                });
                setisUpdate(true);
                seteditId(data.id);
            })

    }
    const onDelete = async (id) => {
        const res = await axios.delete(`${apiUrl}/${id}`);
        alert("data deleted");
        fetchPlayers();
    }

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormdata({
            ...formdata,
            [name]: type === "number" ? Number(value) : value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await axios.post(apiUrl, formdata);

        alert("data saved ");

        setFormdata({
            name: "",
            age: "",
            position: "",
        });


        fetchPlayers();


    }

 const Update =async (e) => {
e.preventDefault();
    const response = await axios.put(`${apiUrl}/${editId}`, formdata);

    if (!response.data) {
      alert("Not Update");
    } else {
      alert("Update Successfully");
      setFormdata({ name: "", age: "", position: "" });
      seteditId(null);
     // setIsUpdate(false);
      fetchPlayers();
    }

    }




    return (


        <div>
            <div className="container mt-4">
                <h2 className="mb-4">{isUpdate == true ? "Update Player" : "Add Player"}</h2>

                <form className="row g-3">
                    {/* Name */}
                    <div className="col-md-6">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formdata.name}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter player name"
                        />
                    </div>

                    {/* Position */}
                    <div className="col-md-6">
                        <label className="form-label">Position</label>
                        <input
                            type="text"
                            name="position"
                            value={formdata.position}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter position"
                        />
                    </div>

                    {/* Age */}
                    <div className="col-md-6">
                        <label className="form-label">Age</label>
                        <input
                            type="number"
                            name="age"
                            value={formdata.age}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter age"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="col-12 d-flex gap-2 mt-3">
                        {isUpdate == true ? (
                            <button type="button" className="btn btn-warning" onClick={Update}>
                                Update
                            </button>
                        ) : (
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                                Add
                            </button>
                        )}

                    </div>
                </form>
            </div>



            <div className="row mt-4">
                <div className="col-12">
                    <table className="table table-striped table-bordered table-hover text-center align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Position</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {players.length > 0 ? (
                                players.map((player) => (
                                    <tr key={player.id}>
                                        <td>{player.id}</td>
                                        <td>{player.name}</td>
                                        <td>{player.age}</td>
                                        <td>{player.position}</td>
                                        <td>
                                            <div className="d-flex justify-content-center gap-2">
                                                <button
                                                    className="btn btn-sm btn-warning"
                                                    onClick={() => Edit(player.id, player)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => onDelete(player.id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-muted">
                                        No players found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>


    );
}

export default Crud;
