import React, { useState, useEffect } from "react";
import { getData } from "../utils/api";
import "./LandingPage.css";
import Pagination from "./Pagination";
import { FiEdit, FiTrash2, FiCheck } from "react-icons/fi";

function LandingPage() {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [currentPage, setcurrentPage] = useState(1);
    const [edit, setEdit] = useState(null);
    const [editData, setEditData] = useState({
        id: null,
        name: null,
        email: null,
        role: null,
    });
    // eslint-disable-next-line no-unused-vars
    const [itemsPerPage, setitemsPerPage] = useState(10);
    const [checked, setChecked] = useState([]);
    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    const currentItems = items.slice(indexOfFirstPost, indexOfLastPost);
    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            const allItems = await getData();
            setItems(allItems);
            setLoading(false);
        };
        fetchItems();
    }, []);

    const paginate = (pageNumber) => {
        setcurrentPage(pageNumber);
    };
    const deleteItem = (item) => {
        var arr = JSON.parse(localStorage.getItem("data"));
        let deletedUser = arr.filter((data) => {
            return data.id !== item.id;
        });
        localStorage.setItem("data", JSON.stringify(deletedUser));
        setItems(deletedUser);
    };
    const editItem = (id) => {
        var arr = JSON.parse(localStorage.getItem("data"));
        console.log(arr);
        let itemId = arr.findIndex((obj) => obj.id === id);
        setEdit(id);
        let editUser = items[itemId];
        localStorage.setItem("data", JSON.stringify(editUser));
        setEditData(editUser);
    };

    const makeChanges = () => {
        let itemIndex = items.findIndex((obj) => obj.id === editData.id);
        let editedValues = [...items];
        editedValues[itemIndex] = editData;
        localStorage.setItem("data", JSON.stringify(editedValues));
        setItems(editedValues);
        setEdit(null);
    };

    const handleSearch = (e) => {
        let searchInput = [];
        var arr = JSON.parse(localStorage.getItem("data"));
        const input = e.target.value.toLowerCase();
        if (input) {
            searchInput = arr.filter((item) => {
                return Object.values(item).some((val) =>
                    String(val).toLowerCase().includes(input)
                );
            });
        }
        setItems(searchInput);
        if (e.target.value === "") setItems(arr);
    };

    const handleChecked = (e, item) => {
        if (e.target.checked) {
            setChecked([...checked, item]);
        } else setChecked(checked.filter((val) => val !== item));
    };

    const deleteSelected = () => {
        let deleteItems = items.filter((el) => !checked.includes(el));
        setItems(deleteItems);
        localStorage.setItem("data", JSON.stringify(deleteItems));
    };

    const handlePageChecked = (e) => {
        if (e.target.checked) {
            setChecked(currentItems);
        } else {
            setChecked([]);
        }
    };
    return (
        <div>
            <input
                placeholder="Type to search"
                className="search-bar"
                onChange={handleSearch}
            />
            {loading ? (
                <div className="loading"></div>
            ) : (
                <>
                    {items.length > 0 ? (
                        <table>
                            <tbody>
                                <tr>
                                    <th>
                                        <input
                                            type="checkbox"
                                            onChange={(e) => handlePageChecked(e)}
                                        />
                                    </th>
                                    {Object.keys(items[0]).map(
                                        (data, index) =>
                                            data !== "id" && <th key={index}>{data}</th>
                                    )}
                                    <th>actions</th>
                                </tr>
                                {currentItems.map((item, idx) => (
                                    <tr key={idx} className={checked.includes(item) ? "checked" : "non-checked" }>
                                        {edit === item.id ? (
                                            <>
                                                <td>
                                                    <input
                                                        onChange={(e) => handleChecked(e, item)}
                                                        type="checkbox"
                                                        checked={checked.includes(item)}
                                                        id={item.id}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        name="name"
                                                        type="text"
                                                        defaultValue={item.name}
                                                        onChange={(e) =>
                                                            setEditData({ ...editData, name: e.target.value })
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        name="email"
                                                        type="text"
                                                        defaultValue={item.email}
                                                        onChange={(e) =>
                                                            setEditData({
                                                                ...editData,
                                                                email: e.target.value,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        name="role"
                                                        type="text"
                                                        defaultValue={item.role}
                                                        onChange={(e) =>
                                                            setEditData({ ...editData, role: e.target.value })
                                                        }
                                                    />
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td>
                                                    {" "}
                                                    <input
                                                        onChange={(e) => handleChecked(e, item)}
                                                        type="checkbox"
                                                        checked={checked.includes(item)}
                                                        id={item.id}
                                                    />
                                                </td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.role}</td>
                                            </>
                                        )}

                                        <td>
                                            <>
                                                {edit === item.id ? (
                                                    <div className="icons-section">
                                                        <FiCheck
                                                            size={25}
                                                            onClick={() => makeChanges()}
                                                            color="green"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="icons-section">
                                                        <FiEdit
                                                            size={25}
                                                            cursor="pointer"
                                                            color="black"
                                                            onClick={() => editItem(item.id)}
                                                        />
                                                        <FiTrash2
                                                            size={25}
                                                            color="black"
                                                            cursor="pointer"
                                                            onClick={() => deleteItem(item)}
                                                        />
                                                    </div>
                                                )}
                                            </>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div>No Items found</div>
                    )}
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        totalPosts={items.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                    <button className="delete-all" onClick={deleteSelected}>
                        {" "}
                        Delete Selected
                    </button>
                </>
            )}
        </div>
    );
}

export default LandingPage;
