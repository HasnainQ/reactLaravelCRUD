import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppContainer from "./AppContainer";
import api from "../api";

const Home = () => {
    const [posts, setPosts] = useState(null);
    const fetchAllPosts = () => {
        api.getAllPosts().then((res) => {
            const result = res.data;
            setPosts(result.data);
        });
    };
    useEffect(() => {
        fetchAllPosts();
    }, []);
    const renderPosts = () => {
        if (!posts) {
            return (
                <tr>
                    <td colSpan="4">Loading Posts.....</td>
                </tr>
            );
        }
        if (posts.length === 0) {
            return (
                <tr>
                    <td colSpan="4">There is no post yet. Add one. </td>
                </tr>
            );
        }
        return posts.map((post) => (
            <tr>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.description}</td>
                <td>
                    <Link
                        to={`/edit/${post.id}`}
                        className="btn btn-warning mr-2"
                    >
                        Edit
                    </Link>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                            api.deletePost(post.id)
                                .then(fetchAllPosts)
                                .catch((err) => {
                                    alert(
                                        "Failed to delete post with id :" +
                                            post.id
                                    );
                                });
                        }}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        ));
    };
    return (
        <AppContainer title="ReactJs Larvel - CRUD App">
            <Link to="/add" className="btn btn-primary">
                Add Item
            </Link>
            <table className="table table-stripped mt-4">
                <thead>
                    <tr>
                        <th>ID.</th>
                        <th>Title</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>{renderPosts()}</tbody>
            </table>
        </AppContainer>
    );
};

export default Home;
